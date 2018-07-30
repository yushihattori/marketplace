import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import Messages from '../../../../../api/Messages';
import Listings from "../../../../../api/Listings";
import Loading from '../../../../Components/Loading';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import {Meteor} from 'meteor/meteor';

const styles = theme => (
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

class OfferMessage extends Component {

  scrollToBottom = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView({block: "nearest", behavior: "auto"})
  };

  componentDidMount() {
    this.scrollToBottom();
    // setTimeout(() => {this.setState({TimedOut: true})}, 00);
  };

  componentDidUpdate() {
    this.scrollToBottom();
  };

  formatDate = date => {
    return date.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  render() {

    // Currently offer messagae returns all messages in that offer. Need to limit it and when you scroll up it shows more or less
    const {formatDate, state} = this;
    const {classes, messages, loading, listing, PriceOfferId, QtyOfferId} = this.props;
    const rejected = {
      color: 'grey',
      textDecoration: 'line-through',
    };
    return (
      !loading ?
        <div className={classes.root}>
          {messages.map(message => {
            return (
              <div key={message._id} className={classes.Container}>
                <Grid container>
                  <Grid container item>
                    <Typography color={message.owner === Meteor.userId() ? "primary" : "default"}
                                className={classes.name}>
                      {message.username}
                    </Typography>
                    <Typography className={classes.created}>
                      {formatDate(message.createdAt)}
                    </Typography>
                  </Grid>
                  <Grid container item spacing={24} xs={12} alignItems={'center'} className={classes.New}>
                    {message.Price !== -1 &&
                    <Grid item>
                      <Typography
                        color={"primary"}
                        className={classes.typography}
                        style={PriceOfferId !== message._id ? rejected : {}}>
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

