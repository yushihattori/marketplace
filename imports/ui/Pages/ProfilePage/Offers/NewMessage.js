import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import {Meteor} from 'meteor/meteor';
import Typography from '@material-ui/core/Typography'

const styles = theme => (
  {
    Button: {
      fontSize: 16,
    },
    input: {
      paddingBottom: 7,
      paddingTop: 10,
      fontSize: 18,
    },
    inputNumbers: {
      paddingBottom: 0,
      paddingTop: 0,
      fontSize: 18,
    },
  }
);

class NewMessage extends Component {
  state = {
    Price: '',
    Qty: '',
    Message: '',
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
    this.setState({MessageRequired: false})
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleClick();
    }
  };

  handleClick = () => {
    const {Price, Qty, Message} = this.state;
    if (Message.trim() || Qty.trim() || Price.trim()) {
      const OfferId = this.props.OfferId;
      const message = {
        Price: Price ? parseFloat(Price) : -1,
        Qty: Qty ? parseFloat(Qty) : -1,
        Message: Message,
        OfferId: OfferId,
      };


      Meteor.call('messages.insert', message, (error, MessageId) => {
        if (Price) {
          Meteor.call('offer.update-price', OfferId, MessageId, Price);
          this.props.updateOffer('PriceOfferId', MessageId);
        }
        if (Qty) {
          Meteor.call('offer.update-qty', OfferId, MessageId, Qty);
          this.props.updateOffer('QtyOfferId', MessageId);
        }
      });
    }
    this.setState({
      Price: '',
      Qty: '',
      Message: '',
    });
  };

  render() {
    const {state, handleClick, handleChange, handleKeyPress} = this;
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid container spacing={16} item xs={12} alignItems={"flex-end"}>
          <Grid item xs={9}>
            <TextField
              id={'message'}
              label={'Message'}
              value={state.Message}
              onChange={handleChange('Message')}
              onKeyPress={handleKeyPress}
              multiline
              fullWidth
              autoFocus
              InputProps={{className: classes.input}}
              InputLabelProps={{shrink: true,}}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              id={'price'}
              label={'Price'}
              value={state.Price}
              onChange={handleChange('Price')}
              onKeyPress={handleKeyPress}
              fullWidth
              InputProps={{className: classes.inputNumbers}}
              InputLabelProps={{shrink: true,}}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              id={'qty'}
              label={'Quantity'}
              value={state.Qty}
              onChange={handleChange('Qty')}
              onKeyPress={handleKeyPress}
              fullWidth
              InputProps={{className: classes.inputNumbers}}
              InputLabelProps={{shrink: true,}}
            />
          </Grid>
          <Grid item xs={1}>
            <Button variant={"extendedFab"} onClick={handleClick} className={classes.Button} color={"primary"}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

NewMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewMessage)


//Change Component, Proptypes, and export Names//