import React, {Fragment, Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter';

const styles = theme => (
  {
    container: {
      padding: 30,
      paddingTop: 90,
    },
    drawer: {
      position: 'fixed',
      zIndex: 1,
      width: 350,
    },
  }
);

class Sidebar extends Component {
  render() {
    const {props} = this;
    const {classes, handleFilterChange, filter, sidebarOpen, CurrentPage} = this.props;
    return (
      <div>
        <Drawer
          classes={{
            paper: classes.drawer
          }}
          open={sidebarOpen}
          variant="persistent"
        >
          <div className={classes.container}>
            {CurrentPage === 'SearchPage' &&
            <Filter
              filter={filter}
              handleFilterChange={handleFilterChange}
            />
            }
          </div>
        </Drawer>
      </div>
    )
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Sidebar)