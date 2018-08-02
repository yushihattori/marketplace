import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import YourListings from './YourLIstings/YourListings';
import YourOffers from './YourOffers/YourOffers';
import OfferTabs from './Components/OfferTabs';

const styles = theme => ({});

class Offers extends Component {
  state = {
    YourListingsClickedId: null,
    YourOffersClickedId: null,
    OfferTab: this.props.location.pathname ? this.props.location.pathname.substr(16) : "YourOffers"
  };

  handleClick = (name, value) => {
    this.setState({[name]: value},)
  };

  handleChange = (event, value) => {
    this.setState({OfferTab: value});
  };

  handleTabClick = (page) => {
    this.props.history.push(`/profile/Offers/${page}`);
  };

  componentDidUpdate(prevProps, prevState) {
    const {pathname} = this.props.location;
    const {OfferTab} = this.state;
    prevProps.location.pathname !== pathname && OfferTab === prevState.OfferTab &&
    this.setState({OfferTab: pathname && pathname.substr(16)})
  }

  render() {
    const {YourListingsClickedId, YourOffersClickedId, OfferTab} = this.state;
    const {props, handleClick, handleChange, handleTabClick} = this;
    return (
      <OfferTabs {...props} OfferTab={OfferTab} handleChange={handleChange} handleTabClick={handleTabClick}>
        <Switch>
          <Route
            exact path='/profile/Offers'
            render={() => (
              <Redirect to='/profile/Offers/YourOffers'/>
            )}/>
          <Route
            path='/profile/Offers/YourListings'
            render={() =>
              <YourListings
                ClickedId={YourListingsClickedId}
                handleClick={handleClick}
              />}
          />
          <Route
            path='/profile/Offers/YourOffers'
            render={() =>
              <YourOffers
                ClickedId={YourOffersClickedId}
                handleClick={handleClick}
              />}
          />
        </Switch>
      </OfferTabs>
    )
  }
}

Offers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Offers));







