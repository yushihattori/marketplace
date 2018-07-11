import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavLink} from 'react-router-dom';
import {Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Autosuggest from 'react-autosuggest';
import Button from '@material-ui/core/Button';
import theme from '../Theme';
import Form from "./Form";
import Sorter from './Sorter';
import {withStyles, withTheme} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import AccountsUIWrapper from '../AccountsUIWrapper/AccountsUIWrapper';
import Filter from './Filter';

const styles = {
    root: {
        flexGrow: 1,
    },
    home: {
        textDecoration: 'none',
        color: 'white',
        marginRight: '25px'
    },
    searchBox: {
        flex: 1,
    },
};

class Header extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position='fixed'>
                    <Toolbar>
                        <AccountsUIWrapper/>

                        <Typography variant="title">
                            <Link to='/' className={classes.home}>Marketplace</Link>
                        </Typography>

                        <div className={classes.searchBox}>
                            <SearchBar
                                input={this.props.input}
                                handleInputChange={this.props.handleInputChange}
                            />
                        </div>

                        {Meteor.user() ? <Form/> : ''}
                        <Filter/>

                        <Sorter sort={this.props.sort} handleSortChange={this.props.handleSortChange}/>

                    </Toolbar>
                </AppBar>
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
    handleSortChange: PropTypes.func.isRequired,
};

export default withTheme()(withStyles(styles)(Header))

