import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from '../../../../Components/Loading';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Panel from './Panel';

const styles = theme => (
  {
    root: {
      height: '100%',
      position: 'relative',
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
      width: '100%',
    },
    none: {
      position: 'absolute',
      left: 20,
      top: 20,
    }
  }
);

class ExpandableOffer extends Component {
  state = {};

  updateOffer = (name, id) => {
    this.setState({[name]: id})
  };

  render() {
    const {state, updateOffer} = this;
    const {classes, loading, listingOffers, ClickedId, listing, handleChange, expanded} = this.props;
    return (
      (!loading && listingOffers) ?
        <div className={classes.root}>
          {listingOffers.length > 0 ?
            <Paper>
              <Grid container className={classes.header}>
                <Grid item xs={2}>
                  <Typography>
                    Offer created by:
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
            </Paper> : ClickedId && <Typography variant={"subheading"} className={classes.none}>No offers received</Typography>
          }
          <div className={classes.panels}>
            {listingOffers.map(offer => (ClickedId === offer.itemId &&
              <Panel
                key={offer._id}
                handleChange={handleChange}
                updateOffer={updateOffer}
                offer={offer}
                listing={listing}
                ClickedId={ClickedId}
                expanded={expanded}
              />)
            )}
            <div id="spacer" style={{height: 100}}/>
          </div>
        </div> : <Loading/>
    )
  }
}

ExpandableOffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpandableOffer)

