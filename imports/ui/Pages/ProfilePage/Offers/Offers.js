import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import {withTracker} from 'meteor/react-meteor-data';
import offers from '../../../../api/Offers';
import OfferCard from './OfferCard';
import OfferMessage from '../Components/OfferMessage';
import {Meteor} from 'meteor/meteor';
import NewMessage from '../Components/NewMessage';
import Typography from '@material-ui/core/Typography'
import Messages from '../../../../api/Messages';
import Listings from "../../../../api/Listings";

const styles = theme => (
  {
    root: {
      position: 'relative',
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
      width: 1800,
      height: 700,
      flexGrow: 1,
    },
    list: {
      paddingTop: 10,
      width: '100%',
      maxWidth: 500,
      maxHeight: '95%',
      overflow: 'auto',
    },
    messages: {
      flex: 1,
      overflow: 'auto',
    },
    newMessage: {
      paddingLeft: 10,
    },
  }
);

class Offers extends Component {
  state = {
    OfferId: '',
    ListingId: '',
    PriceOfferId: '',
    QtyOfferId: '',
  };

  handleClick = (OfferId, ListingId, PriceOfferId, QtyOfferId) => {
    //Just to reset the scroll to bottom when clicked again
    this.setState({OfferId: ''},
      () => this.setState({
        OfferId: OfferId,
        ListingId: ListingId,
        PriceOfferId: PriceOfferId,
        QtyOfferId: QtyOfferId,
      }))
  };

  updateOffer = (name, id) => {
    this.setState({[name]: id})
  };

  render() {
    const {handleClick, updateOffer, state} = this;
    const {classes, offers} = this.props;
    return (
      <div className={classes.root}>
        <Typography variant={"display1"} className={classes.Title}>
          Created Offers
        </Typography>
        <Grid container direction={"row"} className={classes.container} justify={"flex-start"}>
          <Grid item xs={3}>
            <List className={classes.list}>
              {offers.map(offer => (
                <OfferCard
                  key={offer._id}
                  offer={offer}
                  handleClick={handleClick}
                />
              ))}
            </List>
          </Grid>
          <Grid container item direction={"column"} xs={9}>
            <div className={classes.messages}>
              {state.OfferId &&
              <OfferMessage
                OfferId={state.OfferId}
                ListingId={state.ListingId}
                PriceOfferId={state.PriceOfferId}
                QtyOfferId={state.QtyOfferId}
              />}
            </div>
            <div className={classes.newMessage}>
              {state.OfferId &&
              <NewMessage OfferId={state.OfferId} updateOffer={updateOffer}/>}
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Offers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const offersSubscription = Meteor.subscribe('offers');
  return {
    loading: !offersSubscription.ready(),
    offers: offers.find({}, {sort: {updated: -1}}).fetch()
  }
})(withStyles(styles)(Offers))

