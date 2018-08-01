import { Meteor } from 'meteor/meteor';
import '../imports/api/Listings/Listings.js';
import '../imports/api/Listings/methods';
import '../imports/api/Notifications/methods';
import '../imports/api/Offers/methods';
import '../imports/api/Messages/methods';
import '../imports/api/server/publications';
// import '../imports/api/server/indexes';

Meteor.startup(() => {
  // code to run on server at startup
});
