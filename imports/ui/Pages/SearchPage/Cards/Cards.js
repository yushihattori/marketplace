import React, {Fragment, Component} from 'react';
import Card from './Card.js';
import Listings from "../../../../api/Listings";
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {withTheme, withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Loading from '../../../Components/Loading';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Cards extends Component {

  renderCards() {
    const listings = this.props.listings;

    return (
      listings.map(item => (
        <Grid item key={item._id}>
          <Card key={item._id} item={item}/>
        </Grid>
      )
    ))
  }

  render() {
    const {classes, loading} = this.props;
    return (
      !loading ?
      <ResponsiveMasonry
        columnsCountBreakPoints={{0: 1, 600: 2, 800: 3, 1000: 4, 1200: 5, 1600: 6}}
        className={classes.root}
      >
        <Masonry
          gutter="20px"
        >
          {this.renderCards()}
        </Masonry>
      </ResponsiveMasonry> :
        <Loading/>
    )
  }
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  listings: PropTypes.array.isRequired,
};

export default withTracker((props) => {
  const listingsSubcription = Meteor.subscribe('listings', props.input, props.sort, props.filter);
  return {
    loading: !listingsSubcription.ready(),
    listings: Listings.find({}, {sort: props.sort, limit: props.limit}).fetch(),
  }
})(withStyles(styles)(Cards))
