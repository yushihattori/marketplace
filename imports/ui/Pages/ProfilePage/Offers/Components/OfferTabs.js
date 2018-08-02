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
    Paper: {
      paddingTop: 10,
    },
    tabsLabel: {
      fontSize: 18,
    },
    tabsIcon: {
      width: 35,
      height: 35,
    }
  }
);
//This wraps the entire offers page and are able to click between the YourOffers page and YourListings page. Its good
//as a temporary solution but definitely the design acn be improved on.
class OfferTabs extends Component {
  render() {
    const {classes, OfferTab, handleChange, children, handleTabClick} = this.props;
    return (
      <div>
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
        {children}
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
