import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import faker from 'faker';
import {Meteor} from 'meteor/meteor';

//This component is just to create placeholder listings. Doesn't do anything else
export default class Faker extends Component {

  handleClick = () => {
    const pictureNumber = Math.round((Math.random() * 1084));
    const pictureSize = Math.round((Math.random() * (800 - 300) + 300));
    const picture = 'https://placeimg.com/300/' + pictureSize + '/any?ver=' + pictureNumber;

    const pictureSize2Height = Math.round((Math.random() * (720 - 500) + 500));
    const pictureSize2Width = Math.round((Math.random() * (1920 - 1500) + 1500));
    const picture2 = 'https://placeimg.com/' + pictureSize2Width + '/' + pictureSize2Height + '/any?ver=' + pictureNumber;

    const fakes = {
      itemname: faker.commerce.productName(6),
      unit: 'ton',
      currency: faker.finance.currencyName(),
      details: faker.lorem.sentence(100),
      role: (Math.random() >= 0.5 ? 'buyer' : 'seller'),
      allowCounterOffers: Math.random() >= 0.5,
      price: Math.round((Math.random() * (1000)) * 100) / 100,
      stock: Math.round((Math.random() * (1000))),
      CardImage: picture,
      BannerImage: picture2,
      imageId: '',
    };
    Meteor.call('listings.insert', fakes);
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
        >
          Faker
        </Button>
      </div>
    )
  }
}
