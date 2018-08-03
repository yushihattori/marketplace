import {withTracker} from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import theme from './Theme'
import {MuiThemeProvider} from '@material-ui/core/styles';
import ItemPage from './Pages/ItemPage/ItemPage'
import ListingsPage from './Pages/ListingsPage/ListingsPage'
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
      priceRange: {},
      BuyerSeller: 'both',
    }
  };

  //Normal handleChange function for setting states. However, when the sidebar opens an event is called so
  //that the masonary can update
  handleChange = (name, value) => {
    this.setState({[name]: value});
    if (name === 'sidebarOpen') {
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
      }, 400);
    }
  };

  //Changes filter state's values
  handleFilterChange = (name, value) => {
    this.setState({
      ...this.state, filter: {
        ...this.state.filter, [name]: value
      }
    })
  };

  //Handles the search-bar input change
  handleInputChange = event => {
    this.setState({input: event.target.value})
  };

  render() {
    const {state, props, handleChange, handleInputChange, handleFilterChange} = this;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Router>
            {/*Header component wraps the entire App so it always stays*/}
            <Header
              {...state}
              {...props}
              handleChange={handleChange}
              handleInputChange={handleInputChange}
              handleFilterChange={handleFilterChange}
            >
              <Switch>
                <Route exact path='/' render={() => (<Redirect to="/listings"/>)}/>
                <Route path='/listings' render={(props) => <ListingsPage {...state} {...props} handleChange={handleChange}/>}/>
                <Route path='/item' render={(props) => <ItemPage {...state} {...props} handleChange={handleChange}/>}/>
                <Route path='/profile' render={(props) => <ProfilePage {...state} {...props} handleChange={handleChange}/>}/>
                <Route render={() => <div style={{paddingTop: 90, paddingLeft: 30}}>Page Not Found</div>}/>
              </Switch>
            </Header>
          </Router>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);