import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const styles = theme => (
  {
    tabsRoot: {
      borderBottom: '1px solid #e8e8e8',
    },
    tabRoot: {
      textTransform: 'initial',
      minWidth: 70,
      maxWidth: 70,
      fontSize: 10,
      fontWeight: theme.typography.fontWeightRegular,
    },
    tabLabel: {
      fontSize: 15,
    },
    tabLabelContainer: {
      height: 0,
    }
  }
);

class BuyerSeller extends Component {

  handleChange = (event, value) => {
    this.props.handleFilterChange('BuyerSeller', value)
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Tabs
          value={this.props.BuyerSeller}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
          centered
          classes={{root: classes.tabsRoot}}
        >
          <Tab
            disableRipple
            label="Sellers"
            value='seller'
            classes={{
              root: classes.tabRoot,
              label: classes.tabLabel,
              labelContainer: classes.tabLabelContainer,
            }}/>
          <Tab
            disableRipple label="Buyers"
            value='buyer'
            classes={{
              root: classes.tabRoot,
              label: classes.tabLabel,
              labelContainer: classes.tabLabelContainer,
            }}/>
          <Tab
            disableRipple
            label="Both"
            value='both'
            classes={{
              root: classes.tabRoot,
              label: classes.tabLabel,
              labelContainer: classes.tabLabelContainer,
            }}/>
        </Tabs>
      </div>
    )
  }
}

BuyerSeller.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BuyerSeller)