import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from 'prop-types';
import Filter from './Filter/Filter';
import Sorter from './Sorter/Sorter'
import Divider from '@material-ui/core/Divider';
import ItemView from './ItemView/ItemView'

const styles = () => (
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

//Sidebar component that contains all the filters and sorts and stuff
class Sidebar extends Component {
  render() {
    const {classes, handleFilterChange, filter, sidebarOpen, CurrentPage, view, handleChange, sort} = this.props;
    return (
      <div>
        <Drawer
          classes={{paper: classes.drawer}}
          open={sidebarOpen}
          variant="persistent"
        >
          <div className={classes.container}>

            {/*Right now the sidebar is only showing for listings-page because it doesn't work on other pages...
            this part does need a redesign and the menu button on the header needs to be changed as well
            */}
            {CurrentPage === 'ListingsPage' &&
            <div>
              {/*Handles what view to view the cards*/}
              <ItemView view={view} handleChange={handleChange}/>
              {/*Button that shows a list of sorting options*/}
              <Sorter sort={sort} handleChange={handleChange}/>
              <Divider className={classes.Divider}/>
              {/*Holds all the filters. Currently only has price range and listing type*/}
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
  sidebarOpen: PropTypes.bool.isRequired,
  CurrentPage: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar)