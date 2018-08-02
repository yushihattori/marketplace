import React, {Fragment, Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter';
import Sorter from './Sorter/Sorter'
import Divider from '@material-ui/core/Divider';
import ItemView from './ItemView/ItemView'

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
    Divider: {
      marginTop: 20,
      marginBottom: 20,
    }
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
            <div>
              <ItemView view={props.view} handleChange={props.handleChange}/>
              <Sorter sort={props.sort} handleChange={props.handleChange}/>
              <Divider className={classes.Divider}/>
              <Filter
                filter={filter}
                handleFilterChange={handleFilterChange}
              />
              <Divider className={classes.Divider}/>
            </div>
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