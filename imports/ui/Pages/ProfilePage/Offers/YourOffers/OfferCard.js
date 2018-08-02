import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import Listings from "../../../../../api/Listings/Listings";
import Loading from '../../../../Components/Loading';
import Typography from '@material-ui/core/Typography'
import UserAgreeIcon from '../Components/UserAgreeIcon'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid';

const styles = () => (
  {
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'relative',
      width: '100%',
    },
    ItemName: {
      fontSize: 22,
    },
    Role: {
      fontSize: 19,
    },
    CurrentOffer: {
      fontSize: 18,
    },
    Offer: {
      fontSize: 18,
    },
    OfferContainer: {
      outline: '1px solid lightGrey',
      width: '95%',
      paddingRight: 10,
      paddingLeft: 10,
      marginTop: 10,
    },
    MessageContainer: {
      display: 'flex',
      alignItems: 'center',
      alignJustify: 'space-between',
      marginTop: 10,
      marginBottom: -5,
      paddingBottom: -5,
    },
    MessageUser: {
      fontSize: 18,
      marginRight: 8,
    },
    created: {
      fontSize: 13,
    },
    Message: {
      fontSize: 18,
    },
    Image: {
      width: 80,
      height: 80,
      borderRadius: 10,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    header: {
      display: 'flex',
      alignItems: 'center'
    },
    Icons: {
      display: 'flex',
      marginTop: 15,
    },
    AgreeStyle: {
      color: 'green',
    }
  }
);

//On the YourOffers page, this is the card you see of all the offers you've made
class OfferCard extends Component {
  //Conditional render based on if the offer has changed, and how did it change
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
    const {OfferChangeRender} = this;
    const {classes, listing, loading, offer, OfferId, handleClick} = this.props;
    const {_id, Message, MessageUser, OfferChange, QtyOffer, PriceOffer, username, OfferUserAgree, ListingUserAgree} = offer;
    //formats the createdAt to a readable date
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
          selected={OfferId === _id}
          className={classes.listItem}
          onClick={() => handleClick(_id)}
        >
          <div className={classes.header}>
            <div className={classes.Image}>
              <img src={listing.CardImage}/>
            </div>
            <div>
              <Typography variant={"headline"} className={classes.ItemName}>
                {listing.itemname}
              </Typography>
              {/*Changes based on role of the listing - buying or selling*/}
              <Typography variant={"body1"} className={classes.Role}>
                {listing.role === "seller" && `Sold by ${listing.username}`}
                {listing.role === "buyer" && `Bought by ${listing.username}`}
              </Typography>
            </div>
          </div>
          <Grid container alignItems={"center"} justify={"space-between"} className={classes.OfferContainer}>
            <Grid item xs={9}>
              <Typography variant={"body2"} className={classes.CurrentOffer}>
                Current Offer:
              </Typography>
              <Typography variant={"body1"} className={classes.Offer}>
                {`Price: $${PriceOffer.toFixed(2)}`}
                &nbsp; &nbsp; &nbsp;
                {`Qty: ${QtyOffer} ${listing.unit}${QtyOffer > 0 && "s"}`}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.Icons}>
              {/*Icons showing which users have agreed so far*/}
              <UserAgreeIcon
                ListingUserAgree={ListingUserAgree}
                name={username}
              />
              <UserAgreeIcon
                OfferUserAgree={OfferUserAgree}
                name={"You"}
              />
            </Grid>
          </Grid>
          <div className={classes.MessageContainer}>
            <Typography variant={"subheading"} className={classes.MessageUser}>
              {MessageUser}
            </Typography>
            <Typography className={classes.created}>
              {created}
            </Typography>
          </div>
          <Typography className={classes.Message}>
            {Message ?
              //this is my jankky way of figuring out if a message is supposed to be green. If it starts with the word
              //#OUA, or "Offer Update Agree", then it changes that message to green. It's not very good. Needs a better way
              Message.substr(0, 4) === "#OUA" ?
                <span className={classes.AgreeStyle}>{Message.substr(4)}</span> :
                `${Message.substr(0, 100)} ${Message.length > 100 ? "..." : ''}` : ''
            }
          </Typography>
          <Typography color={"primary"} className={classes.Message}>
            {OfferChangeRender(OfferChange, PriceOffer, QtyOffer, listing.unit)}
          </Typography>
        </ListItem>
        :
        <Loading/>
    )
  }
}

OfferCard.propTypes = {
  classes: PropTypes.object.isRequired,
  listing: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  offer: PropTypes.object.isRequired,
  OfferId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default withTracker((props) => {
  const ListingId = props.offer.itemId;
  const ListingSubscription = Meteor.subscribe('item', ListingId);
  return {
    loading: !ListingSubscription.ready(),
    listing: Listings.findOne({"_id": ListingId}),
  }
})(withStyles(styles)(OfferCard))

