import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import {withTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import Typography from '@material-ui/core/Typography'
import Listings from "../../../../api/Listings";
import ItemCard from './ItemCard';
import ExpandableOffer from './ExpandableOffer';
import Paper from '@material-ui/core/Paper'

const styles = theme => (
  {
    root: {
      position: 'relative',
      width: '100%',
      height: '90vh',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
    },
    Title: {
      position: 'absolute',
      top: 20,
      left: 20,
    },
    container: {
      paddingTop: 100,
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
      // flex: 1,
      overflow: 'auto',
    },
    newMessage: {
      paddingLeft: 10,
    },
  }
);

class UserListings extends Component {
  state = {
    ClickedId: ''
  };
  handleClick = (ClickedId) => {
    this.setState({ClickedId: ClickedId})
  };

  renderUserListings = (userListings) => {
    console.log(userListings)
    return (userListings.map(item => (
      <ItemCard key={item._id} item={item} handleClick={this.handleClick}/>
    )))
  };

  render() {
    const {renderUserListings, state} = this;
    const {classes, userListings, loading} = this.props;
    const listing = userListings.find(e => {return e._id === state.ClickedId});
    return (
      <div className={classes.root}>
        <Typography variant={"display1"} className={classes.Title}>
          Created Listings
        </Typography>
        <Grid container direction={"row"} className={classes.container} justify={"flex-start"}>
          <Grid item xs={3}>
            <List className={classes.list}>
              {renderUserListings(userListings)}
            </List>
          </Grid>
          <Grid container item direction={"column"} xs={9}>
            <ExpandableOffer ClickedId={state.ClickedId} listing={listing}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

UserListings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const userListingsSubscription = Meteor.subscribe('user-listings');
  return {
    loading: !userListingsSubscription.ready(),
    userListings: Listings.find({}, {sort: {createdAt: -1}}).fetch(),
  }
})(withStyles(styles)(UserListings))

