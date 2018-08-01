import React, {Fragment, Component} from 'react';
import {withTheme, withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Meteor} from 'meteor/meteor';
import PlusIcon from '@material-ui/icons/AddCircleOutline';
import PageSteps from './PageSteps';
import ItemDetailsPage from './Pages/ItemDetailsPage';
import ImagesUploadPage from './Pages/ImagesUploadPage'

const styles = theme => ({
  button: {
    fontSize: '15px',
    color: 'white',
  },
  icon: {
    color: 'white',
    fontSize: 25,
  },
  form: {
    width: '800px',
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '10px',
    justify: 'flex-start',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    marginTop: '7px',
  },
  BackButton: {
    color: theme.palette.grey,
  },
  NextButton: {
    color: theme.palette.primary.main,
  },
  ButtonPosition: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  }
});


class Form extends Component {
  state = {
    open: false,
    activeStep: 0,
    completed: {},
    form: {
      itemname: '',
      price: '',
      stock: '',
      unit: 'ton',
      currency: 'USD',
      details: '',
      role: '',
      allowCounterOffers: true,
    },
  };

  handleOpen = () => {
    this.setState({open: true})

    //    LATER ADD IN FEATURE WHERE WHEN CLICK NEW LISTING, YOU JUST CLEAR THIS FORM. THEN ADD A TAB FEATURE WHERE WHEN U CLICK EXCAPE, YOU JUST LEAVE A TAB TO CONTINUE WORKING
  };

  handleClose = () => {
    this.setState({open: false})
  };

  handleChange = name => event => {
    this.setState({
      ...this.state, form: {
        ...this.state.form, [name]: event.target.value
      }
    })
  };

  handleNumberChange = name => event => {
    this.setState({
      ...this.state, form: {
        ...this.state.form, [name]: event.target.value.replace(/[^\d.]/g, '')
      }
    })
  };

  handleChecked = name => event => {
    this.setState({
      ...this.state, form: {
        ...this.state.form, [name]: event.target.checked
      }
    })
  };

  handleCreateListing = () => {
    const images = [
      "https://static.vecteezy.com/system/resources/previews/000/095/282/non_2x/unique-polygon-background-vector.jpg",
      "https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/145992/580/386/m1/fpnw/wm0/scrn1-.jpg?1405865759&s=f655a1a737238b0bf932b5a82c4c56db",
      "https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/188520/580/386/m1/fpnw/wm0/1-.jpg?1411214949&s=2b1423d7ab11d821a8dc19b634c57bd3",
      "https://image.freepik.com/free-vector/orange-polygon-background_1407-134.jpg",
    ];
    const randomImage = Math.round(Math.random() * 3);

    this.setState({
      ...this.state, form: {
        ...this.state.form,
        price: parseFloat(this.state.form.price),
        stock: parseFloat(this.state.form.stock),
        CardImage: images[randomImage],
        BannerImage: images[randomImage],
      }
    }, () => Meteor.call('listings.insert', this.state.form));
    this.handleClose()
  };

  getStepContent = page => {
    const props = {
      form: this.state.form,
      handleChange: this.handleChange,
      handleNumberChange: this.handleNumberChange,
      handleChecked: this.handleChecked,
      handleUpload: this.handleUpload,
    };
    switch (page) {
      case 0:
        return (
          <ItemDetailsPage
            {...props}
          />
        );
      case 1:
        return (
          <ImagesUploadPage/>
        );
      case 2:
        return 'Page 3';
      default:
        return 'ERROR PAGE NOT FOUND';
    }
  };

  handleStep = index => {
    this.setState({activeStep: index}, this.pageValidate());
  };

  handleStepNext = () => {
    this.state.activeStep !== 2 && this.setState({activeStep: this.state.activeStep + 1}, this.pageValidate());
  };

  handleStepBack = () => {
    this.state.activeStep !== 0 && this.setState({activeStep: this.state.activeStep - 1}, this.pageValidate());
  };

  pageValidate = () => {
    const {form} = this.state;
    const {activeStep} = this.state;

    let validated = true;
    if (activeStep === 0) {
      !form.itemname && (validated = false);
      !form.price && (validated = false);
      !form.stock && (validated = false);
      !form.role && (validated = false);
    }
    if (activeStep === 1) {
      validated = false
    }
    if (activeStep === 2) {
      validated = false
    }
    this.handleComplete(validated);
  };

  handleComplete = (validated) => {
    this.setState({
      ...this.state, completed: {
        ...this.state.completed, [this.state.activeStep]: validated
      }
    });
  };


  render() {
    const {classes} = this.props;
    const {activeStep} = this.state;
    return (
      <div>
        {/*New Listing Button*/}
        <div>
          <Button size="small" onClick={this.handleOpen} className={classes.button}>
            <PlusIcon className={classes.icon}/>
            &nbsp;Create New
          </Button>
        </div>


        <div>
          <Drawer open={this.state.open} anchor='right' onClose={this.handleClose}>
            <div className={classes.form}>

              {/*Close Button*/}
              <div className={classes.header}>
                <IconButton onClick={this.handleClose}>
                  <CloseIcon/>
                </IconButton>
                <Typography className={classes.title}>
                  {this.state.form.itemname.substring(0, 40) || 'New Listing'}
                  {this.state.form.itemname.length > 40 && '...'}
                </Typography>
              </div>

              <PageSteps
                handleStep={this.handleStep}
                activeStep={this.state.activeStep}
                completed={this.state.completed}
              />

              <div>
                {this.getStepContent(activeStep)}
              </div>

              <div className={classes.ButtonPosition}>
                {/*Upload form*/}
                <Button color="primary" variant="outlined" onClick={this.handleCreateListing}>
                  TEMPORARY UPLOAD LISTING
                </Button>

                <Button variant='contained' disabled={activeStep === 0} onClick={this.handleStepBack}
                        className={classes.BackButton}>
                  Back
                </Button>
                <Button variant='contained' disabled={activeStep === 2} onClick={this.handleStepNext}
                        className={classes.NextButton}>
                  Next
                </Button>
                <Button variant='contained' onClick={this.handleComplete} style={{color: 'black'}}>
                  Complete Step
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    )
  }

}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Form))

