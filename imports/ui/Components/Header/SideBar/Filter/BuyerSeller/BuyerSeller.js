import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ToggleButton, {ToggleButtonGroup} from '@material-ui/lab/ToggleButton';
import Typography from '@material-ui/core/Typography'
import ListIcon from '@material-ui/icons/List';

const styles = () => (
  {
    container:{
      marginBottom: 20,
    },
    root: {
      display: 'flex',
    },
    header: {
      fontSize: 18
    },
    typography: {
      fontSize: 16,
    },
    title: {
      display: 'flex',
      marginBottom: 5,
    },
    icon: {
      paddingRight: 3,
      fontSize: 25,
    }
  }
);
//Filter for choosing between to view buyer, seller, or both
class BuyerSeller extends Component {
  //handles the ToggleButtonGroup changes and updates the parent "BuyerSeller" state.
  handleChange = alignment => {
    alignment !== null &&
    this.props.handleFilterChange('BuyerSeller', alignment)
  };

  render() {
    const {handleChange} = this;
    const {classes, BuyerSeller} = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <ListIcon className={classes.icon}/>
          <Typography variant={"headline"} className={classes.header}>
            Listing Type:
          </Typography>
        </div>
        <div className={classes.root}>
          <ToggleButtonGroup value={BuyerSeller} exclusive={true} onChange={handleChange}>
            <ToggleButton disableRipple value={"both"}>
              <Typography variant={"body1"} className={classes.typography}>
                Both
              </Typography>
            </ToggleButton>
            <ToggleButton disableRipple value={"seller"}>
              <Typography variant={"body1"} className={classes.typography}>
                Seller
              </Typography>
            </ToggleButton>
            <ToggleButton disableRipple value={"buyer"}>
              <Typography variant={"body1"} className={classes.typography}>
                Buyer
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    )
  }
}

BuyerSeller.propTypes = {
  classes: PropTypes.object.isRequired,
  BuyerSeller: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(BuyerSeller)