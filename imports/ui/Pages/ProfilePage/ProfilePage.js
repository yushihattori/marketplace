import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Offers from './Offers/Offers';

const styles = theme => (
  {
    Offers: {
      display: 'flex',
      justifyContent: 'center',
    }
  }
);

class ProfilePage extends Component {

  componentDidMount() {
    this.props.handleChange('CurrentPage', 'ProfilePage');
  }

  render() {
    const {props} = this;
    const {classes} = this.props;
    return (
      <div>
        <div className={classes.Offers}>
          <Offers/>
        </div>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfilePage)
