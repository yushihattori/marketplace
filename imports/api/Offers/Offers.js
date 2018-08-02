import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Offers = new Mongo.Collection('Offers');

Offers.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Offers.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const offersSchema = new SimpleSchema({
  QtyOffer: {
    type: Number,
    label: 'Enter quantity of item',
  },
  PriceOffer: {
    type: Number,
    label: 'Enter price of item',
  },
  itemId: {
    type: String,
    label: 'Id of the item',
  },
  PriceOfferId: {
    type: String,
    label: 'the newest offer'
  },
  Message: {
    type: String,
    optional: true,
    label: 'the message'
  },
  MessageUser: {
    type: String,
    optional: true,
    label: 'the message'
  },
  OfferChange: {
    type: String,
    optional: true,
    label: 'the change in price or qty'
  },
  QtyOfferId: {
    type: String,
    label: 'the newest offer'
  },
  listingOwnerId: {
    type: String,
    label: 'Id of the listing owner',
  },
  createdAt: {
    type: Date,
    label: 'Date and time created',
  },
  updated: {
    type: Date,
    label: 'Date and time updated',
  },
  owner: {
    type: String,
    label: 'Id of user offering the bid',
  },
  username: {
    type: String,
    label: 'username of the user offering the bid',
  },
  OfferUserAgree: {
    type: Boolean,
    label: 'If the user who made the offer agrees with the current offer'
  },
  ListingUserAgree: {
    type: Boolean,
    label: 'If the user who made the listing agrees with the current offer'
  },
  DealEnded: {
    type: Boolean,
    label: 'If the deal has been ended by both users agreeing or someone ends the deal'
  },
  allowCounterOffers: {
    type: Boolean,
    label: 'Based on whether the listing allowed counter offers or not'
  }
});

Offers.attachSchema(offersSchema);

export default Offers;
export {offersSchema};
