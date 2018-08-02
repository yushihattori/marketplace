import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

//All the messages made on the offers
const Messages = new Mongo.Collection('Messages');

Messages.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Messages.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const messagesSchema = new SimpleSchema({
  Qty: {
    type: Number,
    label: 'Enter quantity',
  },
  Price: {
    type: Number,
    label: 'Enter price',
  },
  Message: {
    type: String,
    optional: true,
    label: 'Enter message',
  },
  OfferId: {
    type: String,
    label: 'Id of offer',
  },
  createdAt: {
    type: Date,
    label: 'date of message',
  },
  owner: {
    type: String,
    label: 'id of message owner',
  },
  username: {
    type: String,
    label: 'Username of owner of message'
  }
});

Messages.attachSchema(messagesSchema);

export default Messages;
export {messagesSchema};