import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import {Meteor} from 'meteor/meteor';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Confetti from 'react-confetti'

const styles = () => (
  {
    Title: {
      fontSize: 20,
    },
    Content: {
      fontSize: 17,
    },
    Button: {
      fontSize: 15,
    }
  }
);
//When both users agree then this pops up saying congratulations. The confetti is just a joke lol
//Eventually clicking continue should connect with Intelage to create a new trade form
class AgreementDialogue extends Component {
  //Closes the dialogue and deletes from the notifications
  handleClose = () => {
    const {OfferAgreement} = this.props;
    Meteor.call('notification.delete', OfferAgreement)
  };

  render() {
    const {handleClose} = this;
    const {classes, OfferAgreement} = this.props;
    return (
      <Dialog
        open={!!OfferAgreement}
        style={{overflow: 'hidden', overflowY: 'hidden'}}
      >
        <div style={{top: 0, left: 0, width: '100%', height: '100%'}}>
          <Confetti numberOfPieces={100} opacity={0.6} width={600} height={180}/>
        </div>
        <DialogTitle disableTypography>
          <Typography variant={"title"} className={classes.Title}>
            Congratulations on the start of your new trade!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.Content}>
            Click on "Continue" to fill out the details of the trade or click "Okay" to stay on the page.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/*Button to just close dialogue*/}
          <Button onClick={handleClose} color={"inherit"} className={classes.Button}>
            Okay
          </Button>
          {/*Button that continues onto trade form... hopefully*/}
          <Button onClick={handleClose} color={"primary"} className={classes.Button}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

AgreementDialogue.propTypes = {
  classes: PropTypes.object.isRequired,
  OfferAgreement: PropTypes.object.isRequired,
};

export default withStyles(styles)(AgreementDialogue)
