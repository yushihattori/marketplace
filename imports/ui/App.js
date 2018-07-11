import {withTracker} from 'meteor/react-meteor-data';
import React, {Fragment, Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home/Home';
import theme from './Theme'
import { MuiThemeProvider} from '@material-ui/core/styles';

class App extends Component {
    render() {
        return (
            <Fragment>
                <MuiThemeProvider theme={theme}>
                    <Router>
                        <div className='container'>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route render={() => <p>Not Found</p>}/>
                            </Switch>
                        </div>
                    </Router>
                </MuiThemeProvider>
            </Fragment>
        )
    }
}

export default withTracker(() => {
    return {
        currentUser: Meteor.user(),
    };
})(App);