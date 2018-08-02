import React, {Fragment, Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PriceRange from './PriceRange/PriceRange';
import BuyerSeller from './BuyerSeller/BuyerSeller';

const styles = () => ({

});

//Contains all the filters in the side-bar component
class Filter extends Component {
  render() {
    const {filter} = this.props;

    return (
      <Fragment>
        {/*Filter for choosing buyer, seller, or both*/}
        <BuyerSeller
          BuyerSeller={filter.BuyerSeller}
          handleFilterChange={this.props.handleFilterChange}
        />
        {/*Filter for price range of items*/}
        <PriceRange
          priceRange={filter.priceRange}
          handleFilterChange={this.props.handleFilterChange}
        />
      </Fragment>
    )
  }
}

Filter.propTypes = {
  filter: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter)
