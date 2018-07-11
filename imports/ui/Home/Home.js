import React, {Fragment, Component} from 'react';
import Header from '../Header/Header';
import Cards from '../Homecards/Cards'
import Grid from '@material-ui/core/Grid';

export default class Home extends Component {

    state = {
        sort: {createdAt: -1},
        input: '',
    };

    handleSortChange = (option) => {
        this.setState({sort: option})
    };

    handleInputChange = event => {
        this.setState({input: event.target.value})
    };

    render() {
        return (
            <Fragment>
                <Header input={this.state.input}
                        handleInputChange={this.handleInputChange}
                        sort={this.state.sort}
                        handleSortChange={this.handleSortChange}/>
                <Cards
                    sort={this.state.sort}
                    input={this.state.input}
                />
            </Fragment>

        )
    }
}