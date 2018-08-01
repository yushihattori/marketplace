import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Notifications = new Mongo.Collection('Notifications');

Notifications.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Notifications.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const notificationsSchema = new SimpleSchema({
  userId: {
    type: String,
    label: 'Id of User receiving the notification',
  },
  NotificationType: {
    type: String,
    label: 'Type of notification',
  },
  OfferId: {
    type: String,
    optional: true,
    label: 'If notification type is for finished offers'
  },
  createdAt: {
    type: Date,
    label: 'Date created',
  }
});

Notifications.attachSchema(notificationsSchema);

export default Notifications;
export {notificationsSchema};