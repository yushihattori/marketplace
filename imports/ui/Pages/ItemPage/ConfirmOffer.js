import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'

const styles = () => (
  {
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    content: {
      fontSize: 18,
    },
    button: {
      fontSize: 15,
    }
  }
);

//After submitting a bid, this confirms first before submitting
class ConfirmOffer extends Component {

  handleClick = (value) => {
    this.props.handleConfirmation(value);
    this.props.handleValueChange('open', false);
  };

  render() {
    const {handleClick} = this;
    const {classes, open, handleValueChange} = this.props;
    return (
      <div>
        <Dialog
          disableRestoreFocus
          open={open}
          onClose={() => handleValueChange('open', false)}
        >
          <DialogTitle disableTypography className={classes.title}>
            Click to confirm.
          </DialogTitle>
          <DialogContent className={classes.content}>
            Make sure your details are correct. Once you click confirm,
            a message will be sent to the owner of this listing.
          </DialogContent>
          <DialogActions>
            {/*Cancel button*/}
            <Button onClick={() => handleClick(false)} color="primary" className={classes.button}>
              Cancel
            </Button>
            {/*Confirm Button*/}
            <Button onClick={() => handleClick(true)} color="primary" className={classes.button} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

ConfirmOffer.propTypes = {
  classes: PropTypes.object.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ConfirmOffer)