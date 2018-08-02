import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check'
import Typography from "@material-ui/core/Typography";
import HourglassIcon from '@material-ui/icons/HourglassEmpty';

const styles = () => (
  {
    hourglass: {
      width: 30,
      height: 30,
      color: 'grey',
    },
    check: {
      width: 30,
      height: 30,
      color: 'green',
    },
    checkLabel: {
      fontSize: 16,
      whiteSpace: 'nowrap'
    },
    checkContainer: {
      marginTop: -8,
      marginLeft: 5,
      marginRight: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center"
    },
  }
);
//Icon that shows if the user has agreed to the offer or not
class UserAgreeIcon extends Component {
  render() {
    const {classes, OfferUserAgree, ListingUserAgree, name} = this.props;
    return (
      OfferUserAgree !== undefined ?
        <div className={classes.checkContainer}>
          {OfferUserAgree ? <CheckIcon className={classes.check}/> : <HourglassIcon className={classes.hourglass}/>}
          <Typography className={classes.checkLabel}>
            {name}
          </Typography>
        </div> : ListingUserAgree !== undefined ?
        <div className={classes.checkContainer}>
          {ListingUserAgree ? <CheckIcon className={classes.check}/> : <HourglassIcon className={classes.hourglass}/>}
          <Typography className={classes.checkLabel}>
            {name}
          </Typography>
        </div> : <div>Error</div>

    )
  }
}

UserAgreeIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  ListingUserAgree: PropTypes.bool,
  OfferUserAgree: PropTypes.bool,
};

export default withStyles(styles)(UserAgreeIcon)