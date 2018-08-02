import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import Listings from "../../../../../api/Listings/Listings";
import ItemCard from './ItemCard';
import ExpandableOffer from './ListingOffers';
import Offers from '../../../../../api/Offers/Offers';
import Loading from '../../../../Components/Loading';

const styles = () => (
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

//Component page that shows all the listings that you have. Clicking on a listing will show all the offers and clicking
//on the offer shows the messages and stuff
class YourListings extends Component {
  state = {
    //State for which panel is currently open
    expanded: null,
  };

  //Changes which one is expanded
  handleChange = (panel) => (event, expanded) => {
    this.setState({expanded: expanded ? panel : false});
  };

  //Closes all expanded panels
  closeAllExpanded = () => {
    this.setState({expanded: null})
  };

  render() {
    const {handleChange, state, closeAllExpanded} = this;
    const {classes, userListings, loading, ClickedId, handleClick, allListingOffers} = this.props;
    //Grabs the listing that is currently clicked on
    const listing = userListings.find(e => {
      return e._id === ClickedId
    });

    return (
      !loading ?
        <div className={classes.root}>
          <Grid container direction={"row"} className={classes.container} justify={"flex-start"}>
            <Grid item xs={3}>
              <List className={classes.list}>
                {/*Maps out all the listings*/}
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
              {/*When a listing is clicked on it shows all the offers*/}
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
  userListings: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  ClickedId: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  allListingOffers: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const listingOffersSub = Meteor.subscribe('all-listing-offers');
  const userListingsSub = Meteor.subscribe('user-listings');
  return {
    loading: (!userListingsSub.ready() && !listingOffersSub.ready()),
    allListingOffers: Offers.find({}, {sort: {updated: -1}}).fetch(),
    userListings: Listings.find({}, {sort: {updated: -1}}).fetch(),
  }
})(withStyles(styles)(YourListings))

