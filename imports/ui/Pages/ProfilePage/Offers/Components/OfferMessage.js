import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import Messages from '../../../../../api/Messages/Messages';
import Listings from "../../../../../api/Listings/Listings";
import Loading from '../../../../Components/Loading';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import {Meteor} from 'meteor/meteor';

const styles = () => (
  {
    root: {
      flexGrow: 1,
    },
    Container: {
      maxWidth: '100%',
      width: 'auto',
      padding: 10,
    },
    New: {
      display: 'flex',
      fontSize: 16,
    },
    Message: {
      wordWrap: 'break-word',
      fontSize: 16,
    },
    typography: {
      fontSize: 16,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingRight: 10,
    },
    created: {
      fontSize: 16,
    }
  }
);
//This component shows all of the messages on the current offer
class OfferMessage extends Component {
  //Scrolls to the end of messages
  scrollToBottom = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView({block: "nearest", behavior: "auto"})
  };
  //Calls to scroll to bottom when messages are first mounted
  componentDidMount() {
    this.scrollToBottom();
  };
  //Scrolls to bottom when a new message is entered
  componentDidUpdate() {
    this.scrollToBottom();
  };

  //Formats the date to make it readable
  formatDate = date => {
    return date.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  render() {
    // Currently offer message returns all messages in that offer. Need to limit it and when you scroll up it shows more or less
    const {formatDate} = this;
    const {classes, messages, loading, listing, PriceOfferId, QtyOfferId} = this.props;
    //The format for when an offer is rejected
    const rejected = {
      color: 'grey',
      textDecoration: 'line-through',
    };
    return (
      !loading ?
        <div className={classes.root}>
          {/*Maps out all the messages*/}
          {messages.map(message => {
            return (
              <div key={message._id} className={classes.Container}>
                <Grid container>
                  <Grid container item>
                    {/*Changes color based on who the logged in user is*/}
                    <Typography color={message.owner === Meteor.userId() ? "primary" : "default"}
                                className={classes.name}>
                      {message.username}
                    </Typography>
                    <Typography className={classes.created}>
                      {formatDate(message.createdAt)}
                    </Typography>
                  </Grid>
                  <Grid container item spacing={24} xs={12} alignItems={'center'} className={classes.New}>
                    {/*In the messages, since a number was required if a Price or Qty is -1 then it means there
                    was no Price or Qty entered*/}
                    {message.Price !== -1 &&
                    <Grid item>
                      <Typography
                        color={"primary"}
                        className={classes.typography}
                        style={PriceOfferId !== message._id ? rejected : {}}
                      >
                        {`Offer Price: $${message.Price} per ${listing.unit}`}
                      </Typography>
                    </Grid>
                    }
                    {message.Qty !== -1 &&
                    <Grid item>
                      <Typography
                        color={"primary"}
                        className={classes.typography}
                        style={QtyOfferId !== message._id ? rejected : {}}>
                        {`Offer Quantity: ${message.Qty} ${listing.unit}${message.Qty > 1 ? 's' : ''}`}
                      </Typography>
                    </Grid>
                    }
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.Message}>
                      {/*#OUA Makes the test green*/}
                      {message.Message &&
                      message.Message.substr(0, 4) === "#OUA" ?
                        <span style={{color: 'green'}}>{message.Message.substr(4)}</span> :
                        message.Message
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            )
          })}
          {/*This is the marker for where to scroll to*/}
          <div style={{float: "left", clear: "both"}}
               ref={(el) => {
                 this.messagesEnd = el;
               }}>
          </div>
        </div> : <Loading/>
    )
  }
}

OfferMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.array.isRequired,
  listing: PropTypes.object.isRequired,
  PriceOfferId: PropTypes.string.isRequired,
  QtyOfferId: PropTypes.string.isRequired,

};

export default withTracker((props) => {
  const {OfferId, ListingId} = props;
  const ListingSubscription = Meteor.subscribe('item', ListingId);
  const messagesSubscription = Meteor.subscribe('messages', OfferId);
  return {
    loading: !ListingSubscription.ready() && !messagesSubscription.ready(),
    listing: Listings.findOne({"_id": ListingId}),
    messages: Messages.find({"OfferId": OfferId}, {sort: {createdAt: 1}}).fetch(),
  }
})(withStyles(styles)(OfferMessage))

