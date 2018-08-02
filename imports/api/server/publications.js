import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Listings from '../Listings/Listings';
import Offers from '../Offers/Offers';
import Messages from '../Messages/Messages';
import Notifications from '../Notifications/Notifications';

//Publishes all listings based on the search, sort, and the way it will be filtered
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

//Publishes a single listing item based on the id. This is used in item pages when a user clicks on a listing
Meteor.publish('item', function item(listingId) {
  check(listingId, String);

  //findOne not working... loading forever
  // return Listings.findOne ({_id: listingId})
  return Listings.find({"_id": listingId}, {sort: {createdAt: -1}})
});

//Publishes all the listings of the current logged in user - in "YourListings" page
Meteor.publish('user-listings', function userListings() {
  return Listings.find({"owner": Meteor.userId()}, {sort: {updated: -1}})
});

//Publihes all the messages in the offer thats clicked on
Meteor.publish('messages', function messages(OfferId) {
  check(OfferId, String);
  return Messages.find({"OfferId": OfferId}, {sort: {createdAt: -1}})
});

//Publishes all the offers that the currently logged in user created. Used in "YourOffers" page
Meteor.publish('offers', function offers() {
  return Offers.find({"owner": Meteor.userId()})
});

//Gets all the offers of the listing that the user created
Meteor.publish('all-listing-offers', function allListingOffers() {
  return Offers.find({"listingOwnerId": Meteor.userId()}, {sort: {updated: -1}})
});

//Checks the notifications to see if the offer has an agreement between both parties.
Meteor.publish('offer-agreement', function offerAgreement(OfferId, userId) {
  return Notifications.find({
    $and: [
      {"OfferId": OfferId},
      {"userId": userId},
    ]
  })
});
