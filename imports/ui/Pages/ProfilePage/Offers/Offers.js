import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import YourListings from './YourLIstings/YourListings';
import YourOffers from './YourOffers/YourOffers';
import OfferTabs from './Components/OfferTabs';

class Offers extends Component {
  state = {
    YourListingsClickedId: null,
    YourOffersClickedId: null,
    OfferTab: this.props.location.pathname ? this.props.location.pathname.substr(16) : "YourOffers"
  };

  //Normal state changing function on click
  handleClick = (name, value) => {
    this.setState({[name]: value},)
  };
  //Normal state changing function on change
  handleChange = (event, value) => {
    this.setState({OfferTab: value});
  };
  //Changes the page between clicked tabs of YourOffers and YourListings.
  handleTabClick = (page) => {
    this.props.history.push(`/profile/Offers/${page}`);
  };

  //This updates the state OfferTab to whatever page the user is currently on
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
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Offers);







