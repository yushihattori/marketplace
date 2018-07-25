import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import {withTracker} from 'meteor/react-meteor-data';
import Listings from "../../../../api/Listings";
import Loading from '../../../Components/Loading';
import Typography from '@material-ui/core/Typography'

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
    Red: {
      color: 'red',
    },
    CurrentOffer: {
      fontSize: 18,
    },
    message: {
      fontSize: 16,
      color: 'black',
    },
    OfferChange: {
      fontSize: 16,
      color: 'black',
      fontStyle: 'italic',
    }
  }
);

class OfferCard extends Component {
  OfferChangeRender = (OfferChange, PriceOffer, QtyOffer, unit) => {
    switch (OfferChange) {
      case 'both':
        return <span>
          {`Offer: ${QtyOffer} ${unit}${QtyOffer > 1 ? 's' : ''} at $${PriceOffer} per ${unit}`}</span>;
      case 'price':
        return <span>{`Offer: $${PriceOffer} per ${unit}`}</span>;
      case 'qty':
        return <span>{`Offer: ${QtyOffer} ${unit}${QtyOffer > 1 ? 's' : ''}`}</span>;
      default:
        return null
    }
  };

  render() {
    const {props, OfferChangeRender} = this;
    const {classes, listing, loading, offer} = this.props;
    const {_id, PriceOfferId, QtyOfferId, Message, MessageUser, OfferChange, QtyOffer, PriceOffer} = offer;
    const created = offer.createdAt.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    return (
      !loading ?
        <ListItem
          button
          divider
          className={classes.listItem}
          onClick={() => props.handleClick(_id, listing._id, PriceOfferId, QtyOfferId)}
        >
          <Typography className={classes.status}>
            Pending
          </Typography>
          <Typography className={classes.itemname}>
            {listing.itemname}
          </Typography>
          <Typography className={classes.CurrentOffer}>
            {`Current Offer: `}
            <span className={classes.Red}>{`${QtyOffer} ${listing.unit}s`}</span>
            {` at `}
            <span className={classes.Red}>{`$${PriceOffer.toFixed(2)}`}</span>
            {` per ${listing.unit}`}
          </Typography>
          <div>
            <Typography className={classes.message}>
              {`${MessageUser}: `}
              {Message ? `${Message.substr(0, 100)} ${Message.length > 100 ? "..." : ''}` : ''}
            </Typography>
            <Typography className={classes.OfferChange}>
              {OfferChangeRender(OfferChange, PriceOffer, QtyOffer, listing.unit)}
            </Typography>
          </div>
        </ListItem> : <Loading/>
    )
  }
}

OfferCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const ListingId = props.offer.itemId;
  const ListingSubscription = Meteor.subscribe('item', ListingId);
  return {
    loading: !ListingSubscription.ready(),
    listing: Listings.findOne({"_id": ListingId}),
  }
})(withStyles(styles)(OfferCard))

