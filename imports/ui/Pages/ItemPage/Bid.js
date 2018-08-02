import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper';
import {Meteor} from 'meteor/meteor';
import ConfirmOffer from './ConfirmOffer';

const styles = () => (
  {
    form: {
      padding: 30,
      width: 800,
      position: 'absolute',
      bottom: 50,
      opacity: 0.9,
    },
    textField: {
      width: 250,
    },
    InputAdornment: {
      fontSize: 20,
      whiteSpace: 'nowrap',
    },
    checkbox: {
      width: 250,
      marginTop: 12,
    },
    Counteroffer: {
      fontSize: 18,
      marginTop: 12,
    },
    input: {
      fontSize: 20,
    },
    error: {
      fontSize: 18,
      marginLeft: 10,
      marginTop: 5,
    },
  }
);

class Bid extends Component {
  state = {
    Qty: '',
    Price: this.props.item.price.toFixed(2),
    Message: '',
    QtyError: false,
    QtyRequired: false,
    PriceRequired: false,
    PriceChangeable: false,
    open: false,
    ClickAndConfirm: false,
  };
  //Normal state changing function for textFields
  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  };
  //Normal state changing function for textFields but only takes in numbers and '.'
  handleNumberChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/[^\d.]/g, ''),
      [`${name}Required`]: false,
    }, () => {
      name === 'Qty' && this.checkError()
    })
  };
  //Normal state changing function
  handleValueChange = (name, value) => {
    this.setState({[name]: value});
  };

  //When you leave a textField, the number is changed to a standard form in case they do something like Price = 123.2521.231
  handleBlur = () => {
    const {Qty, Price} = this.state;
    Qty && this.setState({Qty: parseFloat(Qty)});
    Price && this.setState({Price: parseFloat(Price).toFixed(2)});
  };

  //Checks if any fields are incorrect or empty. If it is, sets the state so the fields become red and error message pops up
  checkError() {
    this.state.Qty > this.props.item.stock ? this.setState({QtyError: true}) : this.setState({QtyError: false})
  }

  //Changes state for check field.
  handleCheck = event => {
    this.setState({PriceChangeable: !event.target.checked});
    event.target.checked && this.setState({Price: this.props.item.price.toFixed(2)});
  };

  //Submits the bid to collection and also checks to make sure all fields are correct and filled. This then opens
  //A dialogue that confirms your offer
  handleSubmit = () => {
    const {Price, Qty} = this.state;
    this.setState({
      PriceRequired: !Price,
      QtyRequired: !Qty,
    }, () => {
      if (!this.state.PriceRequired && !this.state.QtyRequired && !this.state.QtyError) {
        this.setState({open: true});
      }
    });
  };

  //When the confirm button is pressed, this is called, meteor.call the offer to be inserted then goes to the profile page
  handleConfirmation = (confirmed) => {
    const {state, props} = this;
    const {_id, owner, allowCounterOffers} = this.props.item;
    const Price = parseFloat(state.Price);
    const Qty = state.Qty;
    if (confirmed) {
      const values = {
        itemId: _id,
        listingOwnerId: owner,
        QtyOffer: Qty,
        PriceOffer: Price,
        PriceOfferId: 'id#',
        QtyOfferId: 'id#',
        Message: state.Message,
        allowCounterOffers: allowCounterOffers
      };
      Meteor.call('offers.insert', values, (error, result) => {
        const OfferId = result;
        const Message = {
          Message: state.Message,
          Qty: Qty,
          Price: Price,
          OfferId: OfferId,
        };
        Meteor.call('messages.insert', Message, _id, (error, result) => {
          Meteor.call('offer.update-price', OfferId, result, Price);
          Meteor.call('offer.update-qty', OfferId, result, Qty);
        });
      });
      props.history.push('/profile/offers');
      this.setState({ClickAndConfirm: true})
    }
  };

  render() {
    const {state, handleChange, handleConfirmation, handleValueChange, handleCheck, handleNumberChange, handleSubmit, handleBlur} = this;
    const {classes, allowCounterOffers} = this.props;
    const {unit} = this.props.item;
    return (
      <Paper square className={classes.form}>
        <Grid container justify={"flex-start"} spacing={24} alignItems={"flex-start"} direction={'row'}>
          <Grid item xs={12}>
            {/*Title*/}
            <Typography variant={"title"} className={classes.Title}>
              Send Offer
            </Typography>
          </Grid>
          <Grid item>
            {/*Quantity input field*/}
            <TextField
              id={'qty'}
              label={state.QtyError ? "Error: Value too large" : "Quantity:"}
              error={state.QtyError || state.QtyRequired}
              value={state.Qty}
              onChange={handleNumberChange('Qty')}
              fullWidth
              onBlur={handleBlur}
              className={classes.textField}
              InputProps={{
                classes: {input: classes.input},
                endAdornment:
                  <InputAdornment
                    position="end"
                    className={classes.InputAdornment}>{unit}{state.Qty > 1 && 's'}
                  </InputAdornment>,
              }}
              InputLabelProps={{shrink: true,}}
            />
          </Grid>
          <Grid item>
            {/*Price input field - if counteroffers is true and the checkbox is off*/}
            <TextField
              id={'price'}
              label={state.PriceChangeable ? `Counteroffer Price:` : `Price per ${unit}:`}
              value={state.Price}
              error={state.PriceRequired}
              onChange={handleNumberChange('Price')}
              fullWidth
              onBlur={handleBlur}
              className={classes.textField}
              InputLabelProps={{shrink: true,}}
              disabled={!state.PriceChangeable}
              InputProps={{
                classes: {input: classes.input},
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </Grid>
          <Grid container item className={classes.checkbox}>
            {/*Checkbox for counteroffers - May want to remove this*/}
            {allowCounterOffers
              ?
              <FormControlLabel
                control={<Checkbox checked={!state.PriceChangeable} color={"primary"} onChange={handleCheck}/>}
                label={"Use Listing Price"}
              />
              :
              <Typography color={"primary"} className={classes.Counteroffer}>Counteroffers not available</Typography>
            }
          </Grid>
          <Grid item xs={12}>
            {/*Message to send with bid*/}
            <TextField
              id='Message'
              label='Message'
              multiline
              rows="5"
              value={state.Message}
              placeholder='Send a message to ask questions, give additional info, or to set up a line of communication.'
              onChange={handleChange('Message')}
              fullWidth
              InputProps={{classes: {input: classes.input}}}
              InputLabelProps={{shrink: true}}
            />
          </Grid>
          <Grid container item>
            {/*Bid submit button*/}
            <Button variant={"outlined"} color={"primary"} disabled={state.ClickAndConfirm} onClick={handleSubmit}>
              Submit
            </Button>
            {/*Confirms after submitting*/}
            <ConfirmOffer
              open={state.open}
              handleValueChange={handleValueChange}
              handleConfirmation={handleConfirmation}
            />
            <Typography className={classes.error} color={"error"}>
              {(state.PriceRequired || state.QtyRequired || state.QtyError) && "Check the fields in red"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

Bid.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bid)

