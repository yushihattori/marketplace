import React, {Component} from 'react';
import Listings from "../../../../api/Listings/Listings";
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Loading from '../../../Components/Loading';
import LongCard from './LongCard';
import NormalCard from './NormalCard';
import List from './List'

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Cards extends Component {

  //maps and renders all the cards. Based on the view, it can return 3 different types of cards
  renderCards() {
    const {listings, view} = this.props;
    return (
      listings.map(item => {
          switch (view) {
            case "Card":
              return (
                <NormalCard key={item._id} item={item}/>
              );
            case "Long Card":
              return (
                <LongCard key={item._id} item={item}/>
              );
            case "List":
              return (
                <List key={item._id} item={item}/>
              )
          }
        }
      ))
  }

  render() {
    const {classes, loading, view} = this.props;
    return (
      !loading ?
        view !== "List" ?
          //Responsive masonry is the cool view where the long cards stack on top of each other
          <ResponsiveMasonry
            columnsCountBreakPoints={{0: 1, 600: 2, 800: 3, 1000: 4, 1200: 5, 1600: 6}}
            className={classes.root}
          >
            <Masonry gutter="20px">
              {this.renderCards()}
            </Masonry>
            {/*The else statement is for the list view*/}
          </ResponsiveMasonry> : <div>{this.renderCards()}</div> : <Loading/>
    )
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  listings: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired,
};

export default withTracker((props) => {
  const listingsSubscription = Meteor.subscribe('listings', props.input, props.sort, props.filter);
  return {
    loading: !listingsSubscription.ready(),
    listings: Listings.find({}, {sort: props.sort, limit: props.limit}).fetch(),
  }
})(withStyles(styles)(Cards))
