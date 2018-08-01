import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import Listings from "../../../../../api/Listings/Listings";
import Loading from '../../../../Components/Loading';
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import theme from '../../../../Theme'
import UserAgreeIcon from '../Components/UserAgreeIcon'

const styles = () => (
  {
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'relative',
      height: 100,
    },
    itemname: {
      fontSize: 19,
      fontWeight: 'bold',
    },
    status: {
      position: 'absolute',
      right: 5,
      top: 5,
      fontSize: 15,
      display: 'flex',
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
      fontStyle: 'italic',
    },
    primary: {
      color: theme.palette.primary.main
    },
    AgreeStyle: {
      color: 'green',
      fontStyle: "italic"
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
    const {_id, Message, MessageUser, OfferChange, QtyOffer, PriceOffer, username, OfferUserAgree, ListingUserAgree} = offer;
    const created = offer.createdAt.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    return (
      !loading ?
        <MenuItem
          button
          divider
          selected={this.props.OfferId === _id}
          className={classes.listItem}
          onClick={() => props.handleClick(offer._id)}
        >
          <div className={classes.status}>
            <UserAgreeIcon
              ListingUserAgree={ListingUserAgree}
              name={username}
            />
            <UserAgreeIcon
              OfferUserAgree={OfferUserAgree}
              name={"You"}
            />
          </div>
          <Typography className={classes.itemname}>
            {listing.itemname}
          </Typography>
          <Typography className={classes.CurrentOffer}>
            {`Current Offer: `}
            <span className={classes.primary}>{`${QtyOffer} ${listing.unit}s`}</span>
            {` at `}
            <span className={classes.primary}>{`$${PriceOffer.toFixed(2)}`}</span>
            {` per ${listing.unit}`}
          </Typography>
          <div>
            <Typography className={classes.message}>
              {`${MessageUser}: `}
              {Message ?
                Message.substr(0, 4) === "#OUA" ?
                  <span className={classes.AgreeStyle}>{Message.substr(4)}</span> :
                  `${Message.substr(0, 100)} ${Message.length > 100 ? "..." : ''}` : ''
              }
            </Typography>
            <Typography color={"primary"} className={classes.OfferChange}>
              {OfferChangeRender(OfferChange, PriceOffer, QtyOffer, listing.unit)}
            </Typography>
          </div>
        </MenuItem> : <Loading/>
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

