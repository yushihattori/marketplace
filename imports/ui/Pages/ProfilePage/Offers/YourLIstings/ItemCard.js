import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from '../../../../Components/Loading';
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid';

const styles = theme => (
  {
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'relative',
    },
    ItemName: {
      fontSize: 22,
    },
    Image: {
      width: 80,
      height: 80,
      borderRadius: 10,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    header: {
      display: 'flex',
      alignItems: 'center'
    },
    role: {
      fontSize: 16
    },
    CreatedAt: {
      fontSize: 16
    },
    values: {
      width: '100%',
      outline: '1px solid lightGrey',
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 15,
    },
    Value: {
      fontSize: 18,
      marginTop: 3,
    },
    ValueLabel: {
      fontSize: 18,
    },
    GridItem: {
      display: 'flex',
      alignItems: 'center',
    },
    OffersContainer: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
    OffersLabel: {
      fontSize: 18
    },
    NumberOfOffers: {
      fontSize: 18
    }
  }
);

class ItemCard extends Component {
  render() {
    const {classes, loading, item, handleClick, ClickedId, listingOffers, closeAllExpanded} = this.props;
    const {_id, itemname, role, CardImage, createdAt, price, stock,} = item;
    const NumberOfOffers = listingOffers ? listingOffers.length : 0;
    const created = createdAt.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      !loading ?
        <ListItem
          button
          divider
          selected={ClickedId === _id}
          onClick={() => {
            handleClick("YourListingsClickedId", _id);
            closeAllExpanded();
          }}
          className={classes.listItem}
        >
          <div className={classes.header}>
            <div className={classes.Image}>
              <img src={CardImage}/>
            </div>
            <div>
              <Typography variant={"headline"} className={classes.ItemName}>
                {itemname}
              </Typography>
              <Typography variant={"caption"} className={classes.role}>
                {role === 'seller' && "Selling"}
                {role === 'buyer' && "Buying"}
              </Typography>
              <Typography variant={"body1"} className={classes.CreatedAt}>
                {`Posted ${created}`}
              </Typography>
            </div>
          </div>
          <Grid container justify={"space-around"} className={classes.values}>
            <Grid item className={classes.GridItem}>
              <Typography variant={"title"} className={classes.ValueLabel}>
                {`Listing price:`} &nbsp;
              </Typography>
              <Typography color={"primary"} className={classes.Value}>
                {price}
              </Typography>
            </Grid>
            <Grid item className={classes.GridItem}>
              <Typography variant={"title"} className={classes.ValueLabel}>
                {`Total in stock:`} &nbsp;
              </Typography>
              <Typography color={"primary"} className={classes.Value}>
                {stock}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.OffersContainer}>
            <Typography className={classes.OffersLabel}>
              {`Number of Offers:`} &nbsp;
            </Typography>
            <Typography color={"primary"} className={classes.NumberOfOffers}>
              {NumberOfOffers}
            </Typography>
          </div>
        </ListItem> : <Loading/>
    )
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard)