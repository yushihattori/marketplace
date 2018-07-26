import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Offers from './Offers/Offers';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import UserListings from './UserListings/UserListings';

const styles = theme => (
  {
  }
);

class ProfilePage extends Component {
  componentDidMount() {
    this.props.handleChange('CurrentPage', 'ProfilePage');
  }
  render() {
    const {props, state} = this;
    const {classes} = this.props;
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/profile' render={() => (<Redirect to='/profile/offers'/>)}/>
            <Route path='/profile/offers' render={(props) => <Offers {...props}/>}/>
            <Route path='/profile/listings' render={() => <UserListings/>} />
            <Route render={() => (<Redirect to='/profile/offers'/>)}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage)
