import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper'

const styles = () => (
  {
    root: {
      flexGrow: 1,
    },
    tabsLabel: {
      fontSize: 15,
    },
    TabsRoot: {
      minHeight: 0,
    },
    Paper: {
      backgroundColor: '#F5F5F5',
      paddingLeft: 20,
      marginRight: 5,
      marginLeft: 5,
      borderRadius: 20,
    }
  }
);

//Choose between Message or counteroffer
class MessageTabs extends Component {
  render() {
    const {classes, tab, tabChange} = this.props;
    return (
      <div className={classes.root}>
        <Paper elevation={1} className={classes.Paper}>
          <Tabs
            textColor={"primary"}
            indicatorColor={"primary"}
            value={tab}
            onChange={tabChange}
            classes={{root: classes.TabsRoot}}
          >
            <Tab
              label={"Message"}
              value={"message"}
              className={classes.tab}
              classes={{label: classes.tabsLabel, root: classes.TabsRoot}}
            />
            <Tab
              label={"Counteroffer"}
              value={"counteroffer"}
              className={classes.tab}
              classes={{label: classes.tabsLabel, root: classes.TabsRoot}}
            />
          </Tabs>
        </Paper>
      </div>
    )
  }
}

MessageTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  tab: PropTypes.string.isRequired,
  tabChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(MessageTabs)
