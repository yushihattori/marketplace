import {withTracker} from 'meteor/react-meteor-data';
import React, {Fragment, Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import theme from './Theme'
import {MuiThemeProvider} from '@material-ui/core/styles';
import ItemPage from './Pages/ItemPage/ItemPage'
import SearchPage from './Pages/SearchPage/SearchPage'
import Header from './Components/Header/Header'
import ProfilePage from './Pages/ProfilePage/ProfilePage'

class App extends Component {
  state = {
    sort: {createdAt: -1},
    view: 'Card',
    input: '',
    CurrentPage: '',
    sidebarOpen: false,
    filter: {
      priceRange:{},
      BuyerSeller: 'both',
    }
  };

  handleChange = (name, value) => {
    this.setState({[name]: value});
    if (name === 'sidebarOpen') {
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
      }, 400);
    }
  };

  handleFilterChange = (name, value) => {
    this.setState({
      ...this.state, filter: {
        ...this.state.filter, [name]: value
      }
    })
  };

  handleInputChange = event => {
    this.setState({input: event.target.value})
  };

  render() {
    const {state, props, handleChange, handleInputChange, handleFilterChange} = this;

    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Header
              {...state}
              {...props}
              handleChange={handleChange}
              handleInputChange={handleInputChange}
              handleFilterChange={handleFilterChange}
            >
              <Switch>
                <Route exact path='/' render={() => (<Redirect to="/search"/>)}/>
                <Route path='/search' render={(props) => <SearchPage {...state} {...props} handleChange={handleChange}/>}/>
                <Route path='/item' render={(props) => <ItemPage {...state} {...props} handleChange={handleChange}/>}/>
                <Route path='/profile' render={(props) => <ProfilePage {...state} {...props} handleChange={handleChange}/>}/>
                <Route render={() => <div style={{paddingTop: 90, paddingLeft: 30}}>Page Not Found</div>}/>
              </Switch>
            </Header>
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