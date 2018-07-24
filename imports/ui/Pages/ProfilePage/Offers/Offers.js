import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import {withTracker} from 'meteor/react-meteor-data';
import offers from '../../../../api/Offers';
import OfferCard from './OfferCard';
import OfferMessage from './OfferMessage';
import {Meteor} from 'meteor/meteor';
import NewMessage from './NewMessage';

const styles = theme => (
  {
    root: {
      paddingTop: 100,
      width: 1800,
      height: 700,
      flexGrow: 1,
    },
    container: {},
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
  }
);

class Offers extends Component {
  state = {
    OfferId: '',
  };

  handleClick = (OfferId) => {
    //Just to reset the scroll to bottom when clicked again
    this.setState({OfferId: ''}, () => this.setState({OfferId: OfferId}))
  };

  render() {
    const {handleClick, state} = this;
    const {classes, offers} = this.props;
    return (
      <Grid container direction={"row"} className={classes.root} justify={"flex-start"}>
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
            {state.OfferId && <OfferMessage OfferId={state.OfferId}/>}
          </div>
          {state.OfferId && <NewMessage OfferId={state.OfferId}/>}
        </Grid>
      </Grid>
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
    offers: offers.find().fetch()
  }
})(withStyles(styles)(Offers))

