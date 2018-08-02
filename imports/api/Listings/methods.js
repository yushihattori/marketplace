import {Meteor,} from 'meteor/meteor';
import {check, Match} from 'meteor/check';
import Listings from './Listings';

Meteor.methods({
  //Method to insert a new listing
  'listings.insert'(values) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(values, {
      itemname: String,
      price: Number,
      stock: Number,
      unit: String,
      currency: String,
      details: String,
      role: String,
      allowCounterOffers: Boolean,
      CardImage: Match.Optional(String),
      BannerImage: Match.Optional(String),
      imageId: Match.Optional(String),
    });

    Listings.insert({
      ...values,
      createdAt: new Date(),
      owner: this.userId,
      lowercaseName: values.itemname.toLowerCase(),
      NumberOfOffers: 0,
      updated: new Date(),
      username: Meteor.users.findOne(this.userId).username,
    });
  },
});