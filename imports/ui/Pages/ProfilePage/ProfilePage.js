import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Offers from './Offers/Offers';
import {Route, Switch, Redirect} from 'react-router-dom';

const styles = theme => (
  {}
);

class ProfilePage extends Component {
  componentDidMount() {
    this.props.handleChange('CurrentPage', 'ProfilePage');
  }

  render() {
    const {props} = this;
    return (
      <Switch>
        <Route exact path='/profile' render={() => (<Redirect to='/profile/Offers'/>)}/>
        <Route path='/profile/Offers' render={() => <Offers {...props}/>}/>
        <Route render={() => (<Redirect to='/profile/Offers'/>)}/>
      </Switch>
    )
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage)
