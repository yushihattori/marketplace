import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import Listings from "../../../../api/Listings";
import Loading from '../../../Components/Loading';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography'

const styles = theme => (
  {
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'relative',
    },
    itemname: {
      fontSize: 19,
      fontWeight: 'bold',
    },
  }
);

class ItemCard extends Component {
  render() {
    const {classes, loading, item, handleClick} = this.props;
    const {_id, itemname} = item;
    return (
      !loading ?
        <ListItem
          button
          divider
          onClick={() => handleClick(_id)}
          className={classes.listItem}
        >
          <Typography className={classes.itemname}>
            {itemname}
          </Typography>
        </ListItem> : <Loading/>
    )
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemCard)