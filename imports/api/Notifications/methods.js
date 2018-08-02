import {Meteor,} from 'meteor/meteor';
import {check} from 'meteor/check';
import Notifications from './Notifications';

Meteor.methods({
  //Notification that the offer has been agreed by both people.
  'offer-agreement.notification'(OfferUserId, ListingUserId, OfferId){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check (OfferUserId, String);
    check(ListingUserId, String);
    check(OfferId, String);

    Notifications.insert({
      userId: OfferUserId,
      NotificationType: "offer-agreement",
      OfferId: OfferId,
      createdAt: new Date(),
    });
    Notifications.insert({
      userId: ListingUserId,
      NotificationType: "offer-agreement",
      OfferId: OfferId,
      createdAt: new Date(),
    })
  },

  //As soon as the user clicks ok or continue, the notification is deleted so they wont see it again when they open up
  //the offer
  'notification.delete'(OfferAgreement){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check (OfferAgreement, Object);

    Notifications.remove(OfferAgreement)
  }
});