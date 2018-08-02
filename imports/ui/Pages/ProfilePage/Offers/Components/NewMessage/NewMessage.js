import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {Meteor} from 'meteor/meteor';
import MessageTabs from './MessageTabs';
import {withTracker} from 'meteor/react-meteor-data';
import Notifications from '../../../../../../api/Notifications/Notifications';
import AgreementDialogue from '../AgreementDialogue'

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
    NewMessage: {
      paddingLeft: 10,
      paddingTop: 10,
      height: 80,
    },
  }
);

class NewMessage extends Component {
  state = {
    Price: '',
    Qty: '',
    Message: '',
    tab: 'message',
  };
  //Normal handle change function
  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };
  //normal handle number change function that only takes in numbers or '.'
  handleNumberChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/[^\d.]/g, '')
    });
  };
  //pressing enter key sends teh message, unless if the shift key is also pressed which allows the message to go
  // multiline. However its not working very well right now since the other elements dont resize to it... gotta fix
  // it somehow...
  handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.handleClick();
    }
  };
  //Changes tabs between messages and counteroffer
  tabChange = (event, value) => {
    this.setState({tab: value})
  };
  //Sends a new message as long as message, qty, or price have a value. Also updates the offer with the new qty or price
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
          this.setState({checked: false});
        }
        if (Qty) {
          Meteor.call('offer.update-qty', OfferId, MessageId, FixedQty);
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

  render() {
    const {state, handleClick, handleNumberChange, handleChange, handleKeyPress, tabChange} = this;
    const {classes, OfferAgreement} = this.props;
    const {allowCounterOffers} = this.props.offer;
    return (
      <div>
        {!!OfferAgreement &&
          <AgreementDialogue
            OfferAgreement={OfferAgreement}
          />
        }
        <Grid container>
          <Grid container item xs={12}>
            {/*Tabs so you can choose between sending a message or sending an offer*/}
            <MessageTabs
              tabChange={tabChange}
              tab={state.tab}
            />
          </Grid>
          <Grid container spacing={16} item xs={12} alignItems={"flex-end"} className={classes.NewMessage}>
            {state.tab === "message" &&
            <Grid item xs>
              {/*Message input field*/}
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
            }
            {state.tab === "counteroffer" &&
            <Grid container spacing={16} item xs={3}>
              {/*Price input field*/}
              <Grid item xs={6}>
                <TextField
                  id={'price'}
                  label={'Price'}
                  value={state.Price}
                  disabled={!allowCounterOffers}
                  onChange={handleNumberChange('Price')}
                  onKeyPress={handleKeyPress}
                  fullWidth
                  autoFocus
                  InputProps={{className: classes.inputNumbers}}
                  InputLabelProps={{shrink: true,}}
                />
              </Grid>
              <Grid item xs={6}>
                {/*Qty input field*/}
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
            </Grid>
            }
            {/*Send button*/}
            <Grid item xs={1}>
              <Button variant={"extendedFab"} onClick={handleClick} className={classes.Button} color={"primary"}>
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

NewMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  offer: PropTypes.object.isRequired,
  OfferAgreement: PropTypes.object,
};

export default withTracker((props) => {
  const OfferId = props.offer._id;
  const offerAgreementSub = Meteor.subscribe('offer-agreement', OfferId, Meteor.userId());
  return {
    loading: !offerAgreementSub.ready(),
    OfferAgreement: Notifications.findOne(),
  }
})
(withStyles(styles)(NewMessage))