import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => (
  {}
);

class Template extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>

      </div>
    )
  }
}

Template.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Template)


//Change Component, Proptypes, and export Names//