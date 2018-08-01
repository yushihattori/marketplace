import {Meteor,} from 'meteor/meteor';
import {check} from 'meteor/check';
import Offers from './Offers';
import Listings from "../Listings/Listings";

Meteor.methods({
  'offers.insert'(values) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(values, {
      QtyOffer: Number,
      PriceOffer: Number,
      itemId: String,
      listingOwnerId: String,
      PriceOfferId: String,
      QtyOfferId: String,
      Message: String,
      allowCounterOffers: Boolean,
    });

    const username = Meteor.users.findOne(this.userId).username;
    const {Qty, Price} = values;
    let OfferChange = 'none';
    if (Qty !== -1 && Price !== -1) {
      OfferChange = 'both';
    } else if (Qty !== -1) {
      OfferChange = 'qty';
    } else if (Price !== -1) {
      OfferChange = 'price';
    } else {
      OfferChange = 'none';
    }

    Listings.update(
      {_id: values.itemId},
      {$inc: {NumberOfOffers: 1}}
    );

    return Offers.insert({
      ...values,
      createdAt: new Date(),
      updated: new Date(),
      owner: this.userId,
      MessageUser: username,
      OfferChange: OfferChange,
      username: username,
      OfferUserAgree: false,
      ListingUserAgree: false,
      DealEnded: false,
    })
  },
  'offer.update-price'(OfferId, PriceOfferId, PriceOffer) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(PriceOfferId, String);
    check(OfferId, String);

    Offers.update({_id: OfferId}, {
      $set: {
        "PriceOfferId": PriceOfferId,
        "PriceOffer": PriceOffer,
        "OfferUserAgree": false,
        "ListingUserAgree": false
      }
    })
  },

  'offer.update-qty'(OfferId, QtyOfferId, QtyOffer) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(QtyOfferId, String);
    check(OfferId, String);

    Offers.update({_id: OfferId}, {
      $set: {
        "QtyOfferId": QtyOfferId,
        "QtyOffer": QtyOffer,
        "OfferUserAgree": false,
        "ListingUserAgree": false
      }
    })
  },

  'offer.update-agree'(OfferId, OfferOwner, ListingOwner, bool) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(OfferId, String);
    check(OfferOwner, String);
    check(ListingOwner, String);
    check(bool, Boolean);

    const currentUser = this.userId;

    let UserAgree = '';
    if (currentUser === OfferOwner) {
      UserAgree = "OfferUserAgree";
    } else if (currentUser === ListingOwner) {
      UserAgree = "ListingUserAgree";
    }
    Offers.update({_id: OfferId}, {$set: {[UserAgree]: bool}});
    const offer = Offers.findOne({_id: OfferId});
    return {
      OfferUserAgree: offer.OfferUserAgree,
      ListingUserAgree: offer.ListingUserAgree
    }
  },
});