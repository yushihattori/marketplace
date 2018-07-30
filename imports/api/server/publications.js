import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Listings from '../Listings';
import Files from '../Files';
import Offers from '../Offers';
import Messages from '../Messages';

Meteor.publish('listings', function listings(searchValue, sort, filter) {
  check(searchValue, String);
  check(sort, Object);
  check(filter, Object);

  const min = parseFloat(filter.priceRange.min || 0);
  const max = parseFloat(filter.priceRange.max || 100000);
  const role = (filter.BuyerSeller === 'buyer' || filter.BuyerSeller === 'seller') ? filter.BuyerSeller : '';

  if (!searchValue) {
    return Listings.find({
      $and: [
        {"price": {$gte: min, $lte: max}},
        {"role": {$regex: role}},
      ]
    }, {sort: sort});
  }

  return Listings.find(
    {
      $and: [
        {
          $or: [
            {"itemname": {$regex: searchValue, $options: "i"}},
            {"details": {$regex: searchValue, $options: "i"}},
            {"username": {$regex: searchValue, $options: "i"}},
          ]
        },
        {"price": {$gte: min, $lte: max}},
        {"role": {$regex: role}},
      ]
    }, {sort: sort})
});

Meteor.publish('item', function item(listingId) {
  check (listingId, String);

  //findOne not working... loading forever
  // return Listings.findOne ({_id: listingId})
  return Listings.find({"_id": listingId},{sort: {createdAt: -1}})
});

Meteor.publish('user-listings', function userListings() {
  return Listings.find({"owner": Meteor.userId()},{sort: {updated: -1}})
});

Meteor.publish('messages', function messages(OfferId) {
  check (OfferId, String);
  return Messages.find({"OfferId": OfferId},{sort: {createdAt: -1}})
  // return Messages.find({"OfferId": OfferId})
});

Meteor.publish('offers', function offers(){
  return Offers.find({"owner": Meteor.userId()})
});

Meteor.publish('all-listing-offers', function allListingOffers(){
  return Offers.find({"listingOwnerId": Meteor.userId()}, {sort: {updated: -1}})
});

Meteor.publish('files', function (imageId) {
  return Files.findOne()
});
