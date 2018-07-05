import React, {Fragment, Component} from 'react';
import Header from '../Header/Header';
import Cards from '../Homecards/Cards'
import Grid from '@material-ui/core/Grid';

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <Cards/>
            </Fragment>

        )
    }
}