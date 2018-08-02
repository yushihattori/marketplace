import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

//Collection of all the listings which are the items that people post to sell or buy
const Listings = new Mongo.Collection('Listings');

Listings.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Listings.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const listingsSchema = new SimpleSchema({
  itemname: {
    type: String,
    label: 'Enter item name',
  },
  lowercaseName: {
    type: String,
    label: 'lower case of name',
  },
  price: {
    type: Number,
    label: 'Enter item price',
  },
  stock: {
    type: Number,
    label: 'Enter stock amount',
  },
  unit: {
    type: String,
    label: 'Unit type of stock',
  },
  currency: {
    type: String,
    label: 'Form of currency',
  },
  details: {
    type: String,
    label: 'Details and description of item',
    optional: 'true',
  },
  role: {
    type: String,
    label: 'Role of buyer or seller',
  },
  allowCounterOffers: {
    type: Boolean,
    label: '',
  },
  createdAt: {
    type: Date,
    label: 'The date listing was created',
  },
  owner: {
    type: String,
    label: 'The owner of this trade',
  },
  username: {
    type: String,
    label: 'The username of the owner of this trade',
  },
  updated: {
    type: Date,
    optional: true,
    label: 'When it was last updated with an offer (or first created)'
  },
  NumberOfOffers: {
    type: Number,
    optional: true,
    label: 'Number of offers made on this listing',
  },
  BannerImage: {
    type: String,
    optional: true,
    label: 'Upload Image',
  },
  CardImage: {
    type: String,
    optional: true,
    label: 'Upload Image',
  },
  imageId: {
    type: String,
    optional: true,
    label: 'Upload Image',
  }
});

Listings.attachSchema(listingsSchema);

export default Listings;
export {listingsSchema};
