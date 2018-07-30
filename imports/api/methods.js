import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Listings from './Listings';
import Offers from './Offers';
import Messages from './Messages';

Meteor.methods({
  'listings.insert'(values) {
    //check stuff ex: cheeck(text, String)
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
      CardImage: String,
      BannerImage: String,
      imageId: String,
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
  'offers.insert'(values) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    check(values, {
      QtyOffer: Number,
      PriceOffer: Number,
      itemId: String,
      listingOwnerId: String,
      PriceOfferId: String,
      QtyOfferId: String,
      Message: String,
    });

    const username = Meteor.users.findOne(this.userId).username;
    const {Qty, Price} = values;
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

    Listings.update(
      {_id: values.itemId},
      {$inc: {NumberOfOffers: 1}}
    );

    return Offers.insert({
      ...values,
      createdAt: new Date(),
      updated: new Date(),
      owner: this.userId,
      MessageUser: username,
      OfferChange: OfferChange,
      username: username,
      OfferUserAgree: false,
      ListingUserAgree: false,
      DealEnded: false,
    })
  },

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

    Listings.update(
      {_id: itemId},
      {
        $set: {
          "updated": new Date(),
        }
      }
    );

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

    return Messages.insert({
      ...values,
      createdAt: new Date(),
      owner: this.userId,
      username: username,
    })
  },

  'offer.update-price'(OfferId, PriceOfferId, PriceOffer) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(PriceOfferId, String);
    check(OfferId, String);

    Offers.update({_id: OfferId}, {
      $set: {
        "PriceOfferId": PriceOfferId,
        "PriceOffer": PriceOffer,
        "OfferUserAgree": false,
        "ListingUserAgree": false
      }
    })
  },

  'offer.update-qty'(OfferId, QtyOfferId, QtyOffer) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(QtyOfferId, String);
    check(OfferId, String);

    Offers.update({_id: OfferId}, {
      $set: {
        "QtyOfferId": QtyOfferId,
        "QtyOffer": QtyOffer,
        "OfferUserAgree": false,
        "ListingUserAgree": false
      }
    })
  },

  'offer.update-agree'(OfferId, OfferOwner, ListingOwner, bool) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(OfferId, String);
    check(OfferOwner, String);
    check(ListingOwner, String);
    check(bool, Boolean);

    const currentUser = this.userId;

    let UserAgree = '';
    if (currentUser === OfferOwner) {
      UserAgree = "OfferUserAgree";
    } else if (currentUser === ListingOwner) {
      UserAgree = "ListingUserAgree";
    }
    Offers.update({_id: OfferId}, {$set: {[UserAgree]: bool}})
  }


  // 'file.insert'(file) {
  //   if (!this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //
  //   const upload = Files.insert({
  //     file: file,
  //     streams: 'dynamic',
  //     chunkSize: 'dynamic',
  //   }, false);
  //
  //   upload.start();
  // },
});