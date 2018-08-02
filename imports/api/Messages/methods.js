import {Meteor,} from 'meteor/meteor';
import {check} from 'meteor/check';
import Listings from '../Listings/Listings';
import Offers from '../Offers/Offers';
import Messages from './Messages';

Meteor.methods({
  //Method to insert a new message
  'messages.insert'(values, itemId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(values, {
      Qty: Number,
      Price: Number,
      Message: String,
      OfferId: String,
    });

    const username = Meteor.users.findOne(this.userId).username;
    const {Qty, Price, Message} = values;
    let OfferChange = 'none';
    if (Qty !== -1 && Price !== -1) {
      OfferChange = 'both';
    } else if (Qty !== -1) {
      OfferChange = 'qty';
    } else if (Price !== -1) {
      OfferChange = 'price';
    } else {
      OfferChange = 'none';
    }

    //Also updates the listing to when the message was sent
    Listings.update(
      {_id: itemId},
      {
        $set: {
          "updated": new Date(),
        }
      }
    );

    //Also updates the specific offer to when the message was sent
    Offers.update(
      {_id: values.OfferId},
      {
        $set: {
          "Message": Message,
          "MessageUser": username,
          "OfferChange": OfferChange,
          "updated": new Date(),
        }
      }
    );

    //Inserts the message
    return Messages.insert({
      ...values,
      createdAt: new Date(),
      owner: this.userId,
      username: username,
    })
  },

});