import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import Listings from "../../../../../api/Listings/Listings";
import ItemCard from './ItemCard';
import ExpandableOffer from './ExpandableOffer';
import Offers from '../../../../../api/Offers/Offers';
import Loading from '../../../../Components/Loading';

const styles = theme => (
  {
    root: {
      position: 'relative',
      width: '100%',
      height: '85vh',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
    },
    container: {
      width: '100%',
      height: '100%',
      flexGrow: 1,
    },
    list: {
      paddingTop: 10,
      width: '100%',
      maxWidth: 500,
      maxHeight: '100%',
      overflow: 'auto',
    },
    OfferList: {
      overflow: 'auto',
    },
    newMessage: {
      paddingLeft: 10,
    },
  }
);

class YourListings extends Component {
  state = {
    expanded: null,
  };

  handleChange = (panel) => (event, expanded) => {
    this.setState({expanded: expanded ? panel : false});
  };

  closeAllExpanded = () => {
    this.setState({expanded: null})
  };

  render() {
    const {handleChange, state, closeAllExpanded} = this;
    const {classes, userListings, loading, ClickedId, handleClick, allListingOffers} = this.props;
    const listing = userListings.find(e => {
      return e._id === ClickedId
    });

    return (
      !loading ?
        <div className={classes.root}>
          <Grid container direction={"row"} className={classes.container} justify={"flex-start"}>
            <Grid item xs={3}>
              <List className={classes.list}>
                {userListings.map(item => {
                  return (
                    <ItemCard
                      key={item._id}
                      item={item}
                      closeAllExpanded={closeAllExpanded}
                      ClickedId={ClickedId}
                      handleClick={handleClick}
                      listingOffers={allListingOffers.filter(e => {
                        return e.itemId === item._id
                      })}
                    />
                  )
                })}
              </List>
            </Grid>
            <Grid container item direction={"column"} xs={9}>
              {ClickedId ? <ExpandableOffer
                ClickedId={ClickedId}
                listing={listing}
                listingOffers={allListingOffers.filter(e => {
                  return e.itemId === ClickedId
                })}
                handleChange={handleChange}
                expanded={state.expanded}
              /> : ''}
            </Grid>
          </Grid>
        </div> : <Loading/>
    )
  }
}

YourListings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const {ClickedId} = props;
  const listingOffersSub = Meteor.subscribe('all-listing-offers');
  const userListingsSubscription = Meteor.subscribe('user-listings');
  return {
    loading: (!userListingsSubscription.ready() && !listingOffersSub.ready()),
    allListingOffers: Offers.find({}, {sort: {updated: -1}}).fetch(),
    userListings: Listings.find({}, {sort: {updated: -1}}).fetch(),
  }
})(withStyles(styles)(YourListings))

