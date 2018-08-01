import {Meteor,} from 'meteor/meteor';
import {check} from 'meteor/check';
import Notifications from './Notifications';

Meteor.methods({
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

  'notification.delete'(OfferAgreement){
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check (OfferAgreement, Object);

    Notifications.remove(OfferAgreement)
  }
});