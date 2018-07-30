import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Loading from '../../../../Components/Loading';
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import LensIcon from '@material-ui/icons/Lens'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => (
  {
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'relative',
      height: 100,
    },
    itemname: {
      fontSize: 19,
      fontWeight: 'bold',
    },
    Offers: {
      position: 'relative'
    },
    OfferNumber: {
      position: 'absolute',
      color: 'white',
      top: -9,
      left: 6.9,
      fontSize: 17
    },
    Icon: {
      position: 'absolute',
      right: 10,
    }
  }
);

class ItemCard extends Component {
  render() {
    const {classes, loading, item, handleClick, ClickedId, listingOffers, closeAllExpanded} = this.props;
    const {_id, itemname} = item;
    const NumberOfOffers = listingOffers ? listingOffers.length : 0;

    return (
      !loading ?
        <MenuItem
          button
          divider
          selected={ClickedId === _id}
          style={{backgroundImage: `url(${item.BannerImage})`, backgroundSize: "100% 130px"}}
          onClick={() => {
            handleClick("YourListingsClickedId", _id);
            closeAllExpanded();
          }}
          className={classes.listItem}
        >
          <Typography className={classes.itemname}>
            {itemname}
          </Typography>
          <div className={classes.Icon}>
            <Icon color={NumberOfOffers > 0 ? "primary" : "action"} className={classes.Offers}>
              <LensIcon/>
              <div className={classes.OfferNumber}>
                {NumberOfOffers}
              </div>
            </Icon>
          </div>
        </MenuItem> : <Loading/>
    )
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard)