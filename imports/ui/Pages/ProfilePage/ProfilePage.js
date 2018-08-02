import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Offers from './Offers/Offers';
import {Route, Switch, Redirect} from 'react-router-dom';

//ProfilePage is the user's profile page. Right now it has offers and listings the user created but those things might
//be better off in a different tab or page and this page instead has user settings, payment data, etc.
export default class ProfilePage extends Component {
  //Give a reference for components like Sidebar to know what page the user is currently on
  componentDidMount() {
    this.props.handleChange('CurrentPage', 'ProfilePage');
  }
  render() {
    const {props} = this;
    return (
      <Switch>
        {/*There really isn't a use for this switch statement right now since there's only Offers page right now*/}
        <Route exact path='/profile' render={() => (<Redirect to='/profile/Offers'/>)}/>
        <Route path='/profile/Offers' render={() => <Offers {...props}/>}/>
        <Route render={() => (<Redirect to='/profile/Offers'/>)}/>
      </Switch>
    )
  }
}

ProfilePage.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

