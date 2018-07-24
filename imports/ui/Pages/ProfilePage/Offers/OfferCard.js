import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import {withTracker} from 'meteor/react-meteor-data';
import Listings from "../../../../api/Listings";
import Loading from '../../../Components/Loading';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Messages from '../../../../api/Messages';

const styles = theme => (
  {
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'relative',
    },
    itemname: {
      fontSize: 19,
      fontWeight: 'bold',
    },
    status: {
      position: 'absolute',
      right: 5,
      top: 0,
      fontSize: 15,
    },
    Price: {
      color: 'red',
    },
    CurrentOffer: {
      fontSize: 18,
    },
    message: {
      fontSize: 16,
      color: 'black',
      padding: 5,
    }
  }
);

class OfferCard extends Component {
  render() {
    const {props} = this;
    const {classes, listing, offer, loading, messages} = this.props;

    const created = offer.createdAt.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      !loading && messages ?
        <ListItem button divider onClick={() => props.handleClick(offer._id)} className={classes.listItem}>
          <Typography className={classes.status}>
            Pending
          </Typography>
          <Typography className={classes.itemname}>
            {listing.itemname}
          </Typography>
          <Typography className={classes.CurrentOffer}>
            {`Current Offer: ${offer.QtyOffer} ${listing.unit}s at `}
            <span className={classes.Price}>{`$${offer.PriceOffer.toFixed(2)}`}</span>
            {` per ${listing.unit}`}
          </Typography>
          <Typography className={classes.message}>
            {/*{offer.Message.substr(0,165)}*/}
            {/*{offer.Message.length > 165 && "..."}*/}
            {messages.Message.substr(0,165)}
            {messages.Message.length > 165 && "..."}
          </Typography>
        </ListItem> : <Loading/>
    )
  }
}

OfferCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const listingId = props.offer.itemId;
  const OfferId = props.offer._id;
  const itemSubscription = Meteor.subscribe('item', listingId);
  const messagesSubscription = Meteor.subscribe('messages', OfferId);
  return {
    loading: !itemSubscription.ready() && !messagesSubscription.ready(),
    listing: Listings.findOne({"_id": listingId}),
    messages: Messages.findOne({"OfferId": OfferId})
  }
})(withStyles(styles)(OfferCard))

