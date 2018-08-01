import React, {Component} from 'react';
import Listings from "../../../../api/Listings/Listings";
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

  renderCards() {
    const {listings, view} = this.props;
    return (
      listings.map(item => {
          switch (view) {
            case "Card":
              return (
                <Grid item key={item._id}>
                  <NormalCard key={item._id} item={item}/>
                </Grid>
              );
            case "Long Card":
              return (
                <Grid item key={item._id}>
                  <LongCard key={item._id} item={item}/>
                </Grid>
              );
            case "List":
              return (
                <Grid item key={item._id}>
                  <List key={item._id} item={item}/>
                </Grid>
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
          <ResponsiveMasonry
            columnsCountBreakPoints={{0: 1, 600: 2, 800: 3, 1000: 4, 1200: 5, 1600: 6}}
            className={classes.root}
          >
            <Masonry gutter="20px">
              {this.renderCards()}
            </Masonry>
          </ResponsiveMasonry> : <div>{this.renderCards()}</div> : <Loading/>
    )
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  listings: PropTypes.array.isRequired,
};

export default withTracker((props) => {
  const listingsSubscription = Meteor.subscribe('listings', props.input, props.sort, props.filter);
  return {
    loading: !listingsSubscription.ready(),
    listings: Listings.find({}, {sort: props.sort, limit: props.limit}).fetch(),
  }
})(withStyles(styles)(Cards))
