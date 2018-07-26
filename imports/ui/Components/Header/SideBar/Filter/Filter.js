import React, {Component, Fragment} from 'react';
import {withTheme, withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import PriceRange from './PriceRange/PriceRange';
import BuyerSeller from './BuyerSeller/BuyerSeller';

const styles = theme => ({});


class Filter extends Component {
  state = {
    filter: this.props.filter,
  };

  render() {
    const {classes} = this.props;
    const filter = this.props.filter;

    return (
      <Fragment>
        <div>
          <BuyerSeller
            BuyerSeller={filter.BuyerSeller}
            handleFilterChange={this.props.handleFilterChange}
          />
          <PriceRange
            priceRange={filter.priceRange}
            handleFilterChange={this.props.handleFilterChange}
          />
        </div>
      </Fragment>
    )
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter)
