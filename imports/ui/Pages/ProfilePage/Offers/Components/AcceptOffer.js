import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider'
import CheckIcon from '@material-ui/icons/Check'
import {Meteor} from 'meteor/meteor';

const styles = theme => (
  {
    root: {
      padding: 10,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    CheckIcon: {
      width: 20,
      height: 20,
    },
    Button: {
      fontSize: 16,
      backgroundColor: 'green',
    },
  }
);

class AcceptOffer extends Component {
  handleClick = (UserAgree) => {
    const {_id, owner, listingOwnerId, itemId} = this.props.offer;
    if (!UserAgree) {
      const message = {
        Price: -1,
        Qty: -1,
        OfferId: _id,
        Message: `#OUA ${Meteor.user().username} has agreed to the offer.`
      };
      Meteor.call('messages.insert', message, itemId);
      Meteor.call('offer.update-agree', _id, owner, listingOwnerId, true, (error, offer) => {
        const {OfferUserAgree, ListingUserAgree} = offer;
        (OfferUserAgree && ListingUserAgree) &&
          Meteor.call('offer-agreement.notification', owner, listingOwnerId, _id);
      })
    }
  };

  render() {
    const {handleClick} = this;
    const {classes} = this.props;
    const {owner, listingOwnerId, OfferUserAgree, ListingUserAgree} = this.props.offer;
    let UserAgree = '';
    switch (Meteor.userId()) {
      case owner:
        UserAgree = OfferUserAgree;
        break;
      case listingOwnerId:
        UserAgree = ListingUserAgree;
        break;
    }
    return (
      <div className={classes.root}>
        <Button
          color={"secondary"}
          disabled={UserAgree}
          variant={"contained"}
          onClick={() => handleClick(UserAgree)}
          className={classes.Button}>
          Accept Offer
          <CheckIcon className={classes.CheckIcon}/>
        </Button>
        <Divider/>
      </div>
    )
  }
}

AcceptOffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AcceptOffer)
