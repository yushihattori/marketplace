import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Form from "./Form/Form";
import Sorter from './Sorter';
import {withStyles, withTheme} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import AccountsUIWrapper from '../AccountsUIWrapper';
import Faker from '../Faker'
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
    const {props, handleProfile} = this;
    const {classes, CurrentPage, children} = this.props;
    let SearchPage = (CurrentPage === 'SearchPage');

    const sidebarTransition = {
      transition: theme.transitions.create(['margin-left'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })
    };
    if (props.sidebarOpen) {
      sidebarTransition.marginLeft = 350;
    }

    return (
      <div className={classes.root}>
        <AppBar position='fixed' className={classes.appbar}>
          <Toolbar>
            <Grid container className={classes.Grid} alignItems='center' justify='center'>
              <Grid container item sm={4} justify={"flex-start"} alignItems={"center"}>
                <IconButton onClick={() => props.handleChange('sidebarOpen', !props.sidebarOpen)}>
                  <MenuIcon className={classes.icon}/>
                </IconButton>
                <Typography variant="title" className={classes.title}>
                  <Link to='/' className={classes.home}>Marketplace</Link>
                </Typography>
                <AccountsUIWrapper/>
              </Grid>
              <Grid item sm={4}>
                <div className={classes.searchBox}>
                  <SearchBar input={props.input} handleInputChange={props.handleInputChange}/>
                </div>
              </Grid>
              <Grid container spacing={0} item sm={4} className={classes.item} justify='flex-end' alignItems={'center'}>
                <Grid item>
                  <Faker/>
                </Grid>
                <Grid item>
                  {SearchPage && <Sorter sort={props.sort} handleChange={props.handleChange}/>}
                </Grid>
                <Grid item>
                  {Meteor.user() && <Form/>}
                </Grid>
                <Grid item>
                  <Link to='/profile'>
                    <IconButton onClick={handleProfile}>
                      <AccountCircle className={classes.icon}/>
                    </IconButton>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Sidebar
          filter={props.filter}
          CurrentPage={CurrentPage}
          sidebarOpen={props.sidebarOpen}
          handleFilterChange={props.handleFilterChange}/>
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
  input: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withTheme()(withStyles(styles)(Header))

