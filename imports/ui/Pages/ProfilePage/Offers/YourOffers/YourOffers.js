import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import {withTracker} from 'meteor/react-meteor-data';
import offers from '../../../../../api/Offers';
import OfferCard from './OfferCard';
import OfferMessage from '../Components/OfferMessage';
import {Meteor} from 'meteor/meteor';
import NewMessage from '../Components/NewMessage';
import Typography from '@material-ui/core/Typography'

const styles = theme => (
  {
    root: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '85vh',
      overflow: 'hidden',
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
      maxHeight: '95%',
      overflow: 'auto',
    },
    messages: {
      flex: 1,
      overflow: 'auto',
    },
    newMessage: {
      paddingLeft: 10,
      paddingBottom: 10,
      paddingTop: 10,
    },
    none: {
      position: 'absolute',
      top: 20,
      left: 20,
    }
  }
);

class YourOffers extends Component {
  state = {
    ClickedOfferId: '',
  };

  handleClick = (ClickedOfferId) => {
    //Just to reset the scroll to bottom when clicked again
    this.setState({ClickedOfferId: ''},
      () => this.setState({
        ClickedOfferId: ClickedOfferId,
      }))
  };

  updateOffer = (name, id) => {
    this.setState({[name]: id})
  };

  render() {
    const {ClickedOfferId} = this.state;
    const {handleClick, updateOffer, state} = this;
    const {classes, offers} = this.props;

    const ClickedOffer = offers.find(e => {
      return e._id === ClickedOfferId
    });

    return (
      <div className={classes.root}>
        {offers && offers.length > 0 ?
          <Grid container direction={"row"} className={classes.container} justify={"flex-start"}>
            <Grid item xs={3}>
              <List className={classes.list}>
                {offers.map(offer => (
                  <OfferCard
                    OfferId={ClickedOfferId}
                    key={offer._id}
                    offer={offer}
                    handleClick={handleClick}
                  />
                ))}
              </List>
            </Grid>
            <Grid container item direction={"column"} xs={9}>
              <div className={classes.messages}>
                {ClickedOffer &&
                <OfferMessage
                  OfferId={ClickedOffer._id}
                  ListingId={ClickedOffer.itemId}
                  PriceOfferId={ClickedOffer.PriceOfferId}
                  QtyOfferId={ClickedOffer.QtyOfferId}
                />}
              </div>
              <div className={classes.newMessage}>
                {ClickedOffer &&
                <NewMessage
                  updateOffer={updateOffer}
                  offer={ClickedOffer}
                />}
              </div>
            </Grid>
          </Grid> : <Typography variant={"subheading"} className={classes.none}>No offers created</Typography>}
      </div>
    )
  }
}

YourOffers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const offersSubscription = Meteor.subscribe('offers');
  return {
    loading: !offersSubscription.ready(),
    offers: offers.find({}, {sort: {updated: -1}}).fetch()
  }
})(withStyles(styles)(YourOffers))

