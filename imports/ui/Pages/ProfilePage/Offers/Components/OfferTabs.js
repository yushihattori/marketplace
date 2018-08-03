import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ListIcon from '@material-ui/icons/List'
import CompareArrowsIcon from '@material-ui/icons/CompareArrows'

const styles = () => (
  {
    root: {
      flexGrow: 1,
      height: '100%',
      position: 'relative',
    },
    Paper: {
      position: 'absolute',
      width: '100%',
      height: 75,
      top: 0,
    },
    tabsLabel: {
      fontSize: 18,
    },
    tabsIcon: {
      width: 35,
      height: 35,
    },
    children: {
      position: 'absolute',
      top: 75,
      left: 0,
      right: 0,
      bottom: 0,
    }
  }
);
//This wraps the entire offers page and are able to click between the YourOffers page and YourListings page. Its good
//as a temporary solution but definitely the design acn be improved on.
class OfferTabs extends Component {
  render() {
    const {classes, OfferTab, handleChange, children, handleTabClick} = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.Paper}>
          <Tabs
            value={OfferTab}
            onChange={handleChange}
            fullWidth
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              icon={<CompareArrowsIcon className={classes.tabsIcon}/>}
              label={"Your Offers"}
              value={"YourOffers"}
              onClick={() => handleTabClick("YourOffers")}
              classes={{label: classes.tabsLabel}}/>
            <Tab
              icon={<ListIcon className={classes.tabsIcon}/>}
              label={"Your Listings"}
              value={"YourListings"}
              onClick={() => handleTabClick("YourListings")}
              classes={{label: classes.tabsLabel}}/>
          </Tabs>
        </Paper>
        <div className={classes.children}>
          {children}
        </div>
      </div>
    )
  }
}

OfferTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  OfferTab: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(OfferTabs)
