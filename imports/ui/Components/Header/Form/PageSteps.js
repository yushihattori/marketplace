import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import LensIcon from '@material-ui/icons/Lens'
import CheckIcon from '@material-ui/icons/CheckCircle'
import OpenIcon from '@material-ui/icons/RadioButtonUnchecked'
import theme from '../../../Theme';
import StepLabel from '@material-ui/core/StepLabel'

const styles = theme => (
  {
    root: {
      padding: 10,
    },
    Label: {
      fontSize: 15,
    },
    LabelContainer: {
      marginTop: -15,
      whiteSpace: 'nowrap',
    },
  }
);

const pages = ['Item Details', 'Other Info', 'Confirm Details'];

class Template extends Component {
  render() {
    const {classes} = this.props;
    const {activeStep} = this.props;
    const {completed} = this.props;
    return (
      <div>
        <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {pages.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={() => this.props.handleStep(index)}
                  disableRipple
                  icon={
                    completed[index]
                      ? <CheckIcon style={{color: theme.palette.status.success}}/>
                      : activeStep === index
                      ? <LensIcon style={{color: theme.palette.primary.main}}/>
                      : <OpenIcon style={{color: theme.palette.primary.main}}/>
                  }
                >
                  <StepLabel
                    classes={{labelContainer: classes.LabelContainer, label: classes.Label}}>
                    {label}
                  </StepLabel>

                  {/*<div className={classes.ButtonLabel}>*/}
                  {/*{label}*/}
                  {/*</div>*/}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </div>
    )
  }
}

Template.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Template)


//Change Component, Proptypes, and export Names//