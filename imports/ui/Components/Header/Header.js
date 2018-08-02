import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Form from "./Form/Form";
import {withStyles, withTheme} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import SearchBar from './Components/SearchBar';
import AccountsUIWrapper from './Components/AccountsUIWrapper';
import Faker from './Components/Faker'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Sidebar from './SideBar/Sidebar';
import theme from "../../Theme";

const styles = {
  root: {
    flexGrow: 1,
  },
  appbar: {
    zIndex: 2,
  },
  home: {
    textDecoration: 'none',
    color: 'white',
    marginRight: '25px',
    fontSize: 29,
  },
  title: {
    marginTop: 3,
    marginLeft: 5
  },
  icon: {
    color: 'white',
  },
  children: {
    marginTop: 60,
  }
};

class Header extends Component {
  render() {
    const {classes, CurrentPage, children, sidebarOpen, handleChange, history, input, handleInputChange, filter, sort, view, handleFilterChange} = this.props;
    //Since the appbar and sidebar are fixed in place, a margin is needed to push the rest of the content inwards when
    //the sidebar opens. This always has a transition to mimic materials side-bar opening.
    const sidebarTransition = {
      transition: theme.transitions.create(['margin-left'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })
    };
    if (sidebarOpen && CurrentPage === 'SearchPage') {
      sidebarTransition.marginLeft = 350;
    }

    return (
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.appbar}>
          <Toolbar>
            <Grid container className={classes.Grid} alignItems='center' justify='center'>
              <Grid container item sm={4} justify={"flex-start"} alignItems={"center"}>

                {/*Menu icon to open side-bar*/}
                <IconButton onClick={() => handleChange('sidebarOpen', !sidebarOpen)}>
                  <MenuIcon className={classes.icon}/>
                </IconButton>

                {/*Marketplace home button*/}
                <Typography variant="title" className={classes.title}>
                  <Link to='/' onClick={() => history.push('/')} className={classes.home}>Marketplace</Link>
                </Typography>

                {/*Simple temporary account login*/}
                <AccountsUIWrapper/>
              </Grid>

              <Grid item sm={4}>
                <div className={classes.searchBox}>
                  {/*Search-bar*/}
                  <SearchBar input={input} handleInputChange={handleInputChange}/>
                </div>
              </Grid>
              <Grid container spacing={0} item sm={4} className={classes.item} justify='flex-end' alignItems={'center'}>
                <Grid item>
                  {/*Faker is just a button that allows you to create listings quickly*/}
                  <Faker/>
                </Grid>
                <Grid item>
                  {/*Form that can let you create new listings*/}
                  {Meteor.user() && <Form/>}
                </Grid>
                <Grid item>
                  {/*Just a button link to bring you to profile page and to YourOffers page*/}
                  <Link to='/profile/Offers/YourOffers'>
                    <IconButton>
                      <AccountCircle className={classes.icon}/>
                    </IconButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Sidebar
          filter={filter}
          sort={sort}
          view={view}
          handleChange={handleChange}
          CurrentPage={CurrentPage}
          sidebarOpen={sidebarOpen && CurrentPage === 'SearchPage'}
          handleFilterChange={handleFilterChange}/>
        <div style={sidebarTransition} className={classes.children}>
          {children}
        </div>
      </div>
    )
  }
}


Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  history: PropTypes.object,
  input: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withTheme()(withStyles(styles)(Header))

