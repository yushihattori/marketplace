import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => (
  {}
);

class ImagesUploadPAge extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        tester
      </div>
    )
  }
}

ImagesUploadPAge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagesUploadPAge)


