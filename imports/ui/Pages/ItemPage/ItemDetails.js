import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = () => (
  {
    root: {
      width: '100%',
      height: '100%',
      opacity: 0.9,
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      padding: 30,
    },
    ItemName: {
      fontSize: 30,
    },
    Values: {
      display: 'flex',
    },
    Value: {
      padding: 10,
    },
    Username: {
      fontSize: 18
    },
    DetailsLabel: {
      fontSize: 18
    },
    DetailsContainer: {
      width: '100%',
    }
  }
);

//On the ItemPage, this is where all the details are. This component was built very quickly and is just showing a basic
//idea
class ItemDetails extends Component {
  render() {
    const {classes, item} = this.props;
    return (
      <Paper square className={classes.root}>
        <div className={classes.container}>
          <Typography variant={"title"} className={classes.ItemName}>
            {item.itemname}
          </Typography>
          <Typography variant={"caption"} className={classes.Username}>
            {`Sold by ${item.username}`}
          </Typography>
          <div className={classes.Values}>
            <Typography className={classes.Value}>
              {`Price: $${item.price}`}
            </Typography>
            <Typography className={classes.Value}>
              {`Stock: ${item.stock} ${item.unit}${item.stock > 0 ? 's' : ''}`}
            </Typography>
          </div>
          <Typography variant={"caption"}>
            {`Counteroffers ${item.allowCounterOffers ? "allowed" : "not allowed"}`}
          </Typography>
          <div className={classes.DetailsContainer}>
            <Typography variant={"title"} className={classes.DetailsLabel}>
              Details:
            </Typography>
            <Typography>
              {item.details && item.details.length > 0 ? item.details : "No description available"}
            </Typography>
          </div>
        </div>
      </Paper>
    )
  }
}

ItemDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemDetails)