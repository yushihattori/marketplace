import React, {Fragment, Component} from 'react';
import Card from './Card.js';
import Listings from "../../api/Listings";
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {withTheme, withStyles} from '@material-ui/core/styles';


const styles = {
    cards: {
        paddingTop: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
};

class Cards extends Component {

    renderCards() {
        const listings = this.props.listings;

        return (listings.map(item => (
                <Card key={item._id} item={item}/>
            )
        ))
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.cards}>
                {this.renderCards()}
            </div>
        )
    }
}
Cards.propTypes = {
    classes: PropTypes.object.isRequired,
    listings: PropTypes.array.isRequired,
};

export default withTracker((props) => {
    const listingsSubcription = Meteor.subscribe('listings', props.input, props.sort);
    return {
        loading: !listingsSubcription.ready(),
        listings: Listings.find({}, {sort: props.sort}).fetch(),
    }
})(withStyles(styles)(Cards))
