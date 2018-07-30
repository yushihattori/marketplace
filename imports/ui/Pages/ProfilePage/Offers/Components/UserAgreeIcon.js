import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check'
import Typography from "@material-ui/core/Typography";

const styles = theme => (
  {
    check: {
      width: 30,
      height: 30,
      color: 'grey',
    },
    checkLabel: {
      fontSize: 16,
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

class UserAgreeIcon extends Component {
  render() {
    const {classes, OfferUserAgree, ListingUserAgree, name} = this.props;
    return (
      OfferUserAgree !== undefined ?
        <div className={classes.checkContainer}>
          <CheckIcon style={{color: OfferUserAgree ? 'green' : ''}} className={classes.check}/>
          <Typography style={{color: OfferUserAgree ? 'green' : ''}} className={classes.checkLabel}>
            {name}
          </Typography>
        </div> : ListingUserAgree !== undefined ?
        <div className={classes.checkContainer}>
          <CheckIcon style={{color: ListingUserAgree ? 'green' : ''}} className={classes.check}/>
          <Typography style={{color: ListingUserAgree ? 'green' : ''}} className={classes.checkLabel}>
            {name}
          </Typography>
        </div> : <div>NEED OFFERUSERAGREE OR LISTINGUSERAGREE</div>

    )
  }
}

UserAgreeIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(UserAgreeIcon)

