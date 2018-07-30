import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {Meteor} from 'meteor/meteor';
import CheckBox from '@material-ui/icons/CheckBox';
import ButtonBase from '@material-ui/core/ButtonBase'
import theme from '../../../../Theme';
import Tooltip from '@material-ui/core/Tooltip'

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
    checkbox: {
      width: 35,
      height: 35,
      color: theme.palette.grey.medium
    },
    buttonbase: {
      marginLeft: 20,
      marginTop: 20,
    }
  }
);

class NewMessage extends Component {
  state = {
    Price: '',
    Qty: '',
    Message: '',
    checked: Meteor.userId() === this.props.offer.owner
      ? this.props.offer.OfferUserAgree
      : Meteor.userId() === this.props.offer.listingOwnerId
      && this.props.offer.ListingUserAgree,
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };

  handleNumberChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/[^\d.]/g, '')
    });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleClick();
    }
  };

  handleClick = () => {
    const {Price, Qty, Message} = this.state;
    const {offer} = this.props;

    const FixedPrice = Price ? parseFloat(parseFloat(Price).toFixed(2)) : -1;
    const FixedQty = Qty ? parseFloat(Qty) : -1;

    if (Message.trim() || Qty.trim() || Price.trim()) {
      const OfferId = offer._id;
      const message = {
        Price: FixedPrice,
        Qty: FixedQty,
        Message: Message,
        OfferId: OfferId,
      };
      Meteor.call('messages.insert', message, offer.itemId, (error, MessageId) => {
        if (Price) {
          Meteor.call('offer.update-price', OfferId, MessageId, FixedPrice);
          this.props.updateOffer('PriceOfferId', MessageId);
          this.setState({checked: false});
        }
        if (Qty) {
          Meteor.call('offer.update-qty', OfferId, MessageId, FixedQty);
          this.props.updateOffer('QtyOfferId', MessageId);
          this.setState({checked: false});
        }
      });
    }
    this.setState({
      Price: '',
      Qty: '',
      Message: '',
    });
  };

  handleAgreeClick = () => {
    const value = !this.state.checked;
    const {_id, owner, listingOwnerId, itemId} = this.props.offer;
    this.setState({checked: value});

    const message = {
      Price: -1,
      Qty: -1,
      OfferId: _id,
      //Offer update agree
      Message: `#OUA ${Meteor.user().username} has ${value ? "agreed to the offer" : "removed their agreement to the offer"}.`
    };

    Meteor.call('messages.insert', message, itemId);
    Meteor.call('offer.update-agree', _id, owner, listingOwnerId, value)
  };

  render() {
    const {state, handleClick, handleNumberChange, handleChange, handleKeyPress, handleAgreeClick} = this;
    const {classes} = this.props;
    return (
      <Grid container>
        <Grid container spacing={16} item xs={12} alignItems={"flex-end"}>
          <Grid container item xs={9} className={classes.message}>
            <Grid item xs={1}>
              <Tooltip title={"Click to confirm offer"} placement={"top"}>
                <ButtonBase disableRipple onClick={handleAgreeClick} className={classes.buttonbase}>
                  <CheckBox style={{color: state.checked ? theme.palette.status.success : ''}}
                            className={classes.checkbox}/>
                </ButtonBase>
              </Tooltip>
            </Grid>
            <Grid item xs={11}>
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
          </Grid>
          <Grid item xs={1}>
            <TextField
              id={'price'}
              label={'Price'}
              value={state.Price}
              onChange={handleNumberChange('Price')}
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
              onChange={handleNumberChange('Qty')}
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