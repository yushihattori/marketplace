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

const styles = theme => (
  {
    form: {
      padding: 30,
      width: '100%',
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
    Price: this.props.price.toFixed(2),
    Message: '',
    QtyError: false,
    QtyRequired: false,
    PriceRequired: false,
    PriceChangeable: false,
    open: false,
    ClickAndConfirm: false,
  };

  componentDidMount() {
    // this.setState({Price: this.props.price})
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  };

  handleNumberChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/[^\d.]/g, ''),
      [`${name}Required`]: false,
    }, () => {
      name === 'Qty' && this.checkError()
    })
  };

  handleValueChange = (name, value) => {
    this.setState({[name]: value});
  };

  handleBlur = () => {
    const {Qty, Price} = this.state
    Qty && this.setState({Qty: parseFloat(Qty)});
    Price && this.setState({Price: parseFloat(Price).toFixed(2)});
  };

  checkError() {
    this.state.Qty > this.props.stock ? this.setState({QtyError: true}) : this.setState({QtyError: false})
  }

  handleCheck = event => {
    this.setState({PriceChangeable: !event.target.checked});
    event.target.checked && this.setState({Price: this.props.price.toFixed(2)});
  };

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

  handleConfirmation = (confirmed) => {
    const {state, props} = this;
    if (confirmed) {
      const values = {
        itemId: props._id,
        listingOwnerId: props.owner,
        QtyOffer: state.Qty,
        PriceOffer: parseFloat(state.Price),
      };
      Meteor.call('offers.insert', values, (error, result) => {
        const OfferId = result;
        const Message = {
          Message: state.Message,
          Qty: state.Qty,
          Price: parseFloat(state.Price),
          OfferId: OfferId,
          Status: 'pending',
        };

        Meteor.call('messages.insert', Message);
      });

      props.history.push('/profile');
      this.setState({ClickAndConfirm: true})
    }
  };

  render() {
    const {props, state, handleChange, handleConfirmation, handleValueChange, handleCheck, handleNumberChange, handleSubmit, handleBlur} = this;
    const {classes} = this.props;
    return (
      <div>
        <Paper square className={classes.form}>
          <Grid container justify={"flex-start"} spacing={24} alignItems={"flex-start"} direction={'row'}>
            <Grid item xs={12}>
              <Typography variant={"title"} className={classes.Title}>
                Send Offer
              </Typography>
            </Grid>
            <Grid item>
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
                      className={classes.InputAdornment}>{props.unit}{state.Qty > 1 && 's'}
                    </InputAdornment>,
                }}
                InputLabelProps={{shrink: true,}}
              />
            </Grid>
            <Grid item>
              <TextField
                id={'price'}
                label={state.PriceChangeable ? `Counteroffer Price:` : `Price per ${props.unit}:`}
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
              {props.allowCounterOffers
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
              <Button variant={"outlined"} color={"primary"} disabled={state.ClickAndConfirm} onClick={handleSubmit}>
                Submit
              </Button>
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
      </div>
    )
  }
}

Bid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bid)

