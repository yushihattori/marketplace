import React, {Fragment, Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import Card from './Card.js';
import {Listings} from '../../api/listings';

const style = {
    cards: {
        paddingTop: '40px',
        display: 'flex',
        flexWrap: 'wrap',
    }
}

export default class Cards extends Component {

    renderCards() {
        const listing = Listings.find({}, {sort: {createdAt: -1}}).fetch();
        return listing.map((item) => (
            <Card key={item._id} item={item}/>
        ))
    }


    render() {
        return (
            <div style={style.cards}>
                {this.renderCards()}
            </div>
        )
    }
}
