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

const style = {
    home: {
        textDecoration: 'none',
        color: 'white',
        marginRight: '25px'
    },
    search: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    buttonLink: {
        textDecoration: 'none',
    },
    button: {},
};

export default class Header extends Component {
    render() {
        return (
            <div>
                <AppBar position='absolute'>
                    <Toolbar>

                        {/*PUT THIS IN GRID SYSTEM LATER - NO GHETTO STUFF*/}
                        <Typography variant="title">
                            <Link to='/' style={style.home}>Marketplace</Link>
                        </Typography>
                        <Grid container spacing={8}>
                            <Grid item sm={8}
                                  style={style.search}>
                                <input/>
                                {/*INPUT AUTOSUGGEST FEATURE LATER! Google React autosuggest and also look at Material UI documentation*/}

                            </Grid>
                            <Grid item sm={4}>
                                <Form/>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <div>
                    Tester
                </div>
            </div>
        )
    }

}