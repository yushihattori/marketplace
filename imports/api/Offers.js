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
  owner: {
    type: String,
    label: 'Id of user offering the bid',
  },
  username: {
    type: String,
    label: 'username of the user offering the bid',
  }
});

Offers.attachSchema(offersSchema);

export default Offers;
export {offersSchema};
