import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import TextField from '@material-ui/core/TextField'

const styles = () => (
  {}
);

//this was supposed to be an image upload page but it doesn't work right now... You can uncomment the textfields
//to put urls of the images in and that works.
class ImagesUploadPAge extends Component {
  render() {
    // const {props} = this;
    // const {classes, form} = this.props;
    return (
      <div>
        Future feature. Image uploading page.
        <div>
          {/*<TextField*/}
            {/*id='Card Image'*/}
            {/*label='Card Image'*/}
            {/*value={form.CardImage}*/}
            {/*onChange={props.handleChange('CardImage')}*/}
          {/*/>*/}
          {/*<TextField*/}
            {/*id='Banner Image'*/}
            {/*label='Banner Image'*/}
            {/*value={form.BannerImage}*/}
            {/*onChange={props.handleChange('BannerImage')}*/}
          {/*/>*/}
        </div>
      </div>
    )
  }
}

ImagesUploadPAge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImagesUploadPAge)


