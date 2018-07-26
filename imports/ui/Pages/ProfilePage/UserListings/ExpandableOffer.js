import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import Offers from '../../../../api/Offers';
import Loading from '../../../Components/Loading';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Panel from './Panel';

const styles = theme => (
  {
    root: {
      height: '100%',
    },
    header: {
      margin: 10,
      paddingLeft: 13,
      paddingRight: 65,
      padding: 10,
    },
    panels: {
      overflowY: 'scroll',
      maxHeight: '95%',
    }
  }
);

class ExpandableOffer extends Component {
  state = {
    expanded: null,
  };

  updateOffer = (name, id) => {
    this.setState({[name]: id})
  };

  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const {state, handleChange, updateOffer} = this;
    const {classes, loading, listingOffers, ClickedId, listing} = this.props;
    return (
      (!loading && listingOffers) ?
        <div className={classes.root}>
          <Paper>
            <Grid container className={classes.header}>
              <Grid item xs={2}>
                <Typography>
                  Name
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>
                  Price
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>
                  Qty
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography>
                  Message
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <div className={classes.panels}>
            {listingOffers.map(offer => (
              <Panel
                key={offer._id}
                offer={offer}
                expanded={state.expanded}
                ClickedId={ClickedId}
                handleChange={handleChange}
                updateOffer={updateOffer}
                listing={listing}
                PriceOfferId={state.PriceOfferId}
                QtyOfferId={state.QtyOfferId}
              />)
            )}
          </div>
        </div> : <Loading/>
    )
  }
}

ExpandableOffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const {ClickedId} = props;
  const listingOffersSub = Meteor.subscribe('listing-offers', ClickedId);
  return {
    loading: !listingOffersSub.ready(),
    listingOffers: Offers.find({}, {sort: {updated: -1}}).fetch(),
  }
})
(withStyles(styles)(ExpandableOffer))

