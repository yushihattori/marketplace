import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
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
    color: theme.palette.primary.main,
  },
  NextButton: {
    color: theme.palette.primary.main,
  },
  ButtonPosition: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  ResetButton: {
    color: theme.palette.grey,
    position: 'absolute',
    bottom: 30,
    left: 30,
  }
});

//This is the form for when you want to create a new listing. Honestly, this was one of the first components I built
//so it isn't very good. There are lots of things that could be changed but it works so you know...
class Form extends Component {
  //The state holds 2 main values. First is the normal state values of the form, and next is the form detail state.
  //I don't really like how I did this the first time so I would change it but changing it now would take too much time...
  //Open should also be a prop. Handles if the form is open or closed.
  //activeStep is for which step on the form you are on
  //Completed shows which pages are completed in the form,
  //form holds all the form values that will be sent into the collection
  state = {
    open: false,
    activeStep: 0,
    completed: {0: false, 1: false, 2: false},
    form: {
      itemname: '',
      price: '',
      stock: '',
      unit: 'ton',
      currency: 'USD',
      details: '',
      role: '',
      allowCounterOffers: true,
      CardImage: '',
      BannerImage: '',
    },
  };

  //Should be a prop. Opens the form
  handleOpen = () => {
    this.setState({open: true})
  };

  //Should be a prop. Closes the form
  handleClose = () => {
    this.setState({open: false})
  };

  //Changes the value of the form values
  handleChange = name => event => {
    this.setState({
      ...this.state, form: {
        ...this.state.form, [name]: event.target.value
      }
    })
  };

  //Changes the value of the form values but only allows numbers and "."
  handleNumberChange = name => event => {
    this.setState({
      ...this.state, form: {
        ...this.state.form, [name]: event.target.value.replace(/[^\d.]/g, '')
      }
    })
  };

  //Handler for checkbox in the form
  handleChecked = name => event => {
    this.setState({
      ...this.state, form: {
        ...this.state.form, [name]: event.target.checked
      }
    })
  };

  //This uploads the form details into the collection. Right now, since image upload isn't working I just have it so
  //random polygon images are the default banner and card image. Obviously that needs to be changed later.
  handleCreateListing = () => {
    const images = [
      "https://static.vecteezy.com/system/resources/previews/000/095/282/non_2x/unique-polygon-background-vector.jpg",
      "https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/145992/580/386/m1/fpnw/wm0/scrn1-.jpg?1405865759&s=f655a1a737238b0bf932b5a82c4c56db",
      "https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/188520/580/386/m1/fpnw/wm0/1-.jpg?1411214949&s=2b1423d7ab11d821a8dc19b634c57bd3",
      "https://image.freepik.com/free-vector/orange-polygon-background_1407-134.jpg",
    ];
    const randomImage = Math.round(Math.random() * images.length);
    const randomBanner = Math.round(Math.random() * images.length);

    //This changes the string values of price and stock into number values
    this.setState({
      ...this.state, form: {
        ...this.state.form,
        price: parseFloat(this.state.form.price),
        stock: parseFloat(this.state.form.stock),
        CardImage: images[randomImage],
        BannerImage: images[randomBanner],
      }
    }, () => {
      //inserts the new listing then resets the form and closes it. I think there's a race condition
      // between the reset and meteor.call but It's working fine so uh maybe be careful :)
      const form = this.state.form;
      Meteor.call('listings.insert', form);
      this.reset()
    });
    this.handleClose()
  };

  //This returns the page content for the page you are currently on in the form.
  getStepContent = page => {
    const props = {
      form: this.state.form,
      handleChange: this.handleChange,
      handleNumberChange: this.handleNumberChange,
      handleChecked: this.handleChecked,
      handleUpload: this.handleUpload,
      pageValidate: this.pageValidate,
    };
    switch (page) {
      case 0:
        return (
          //First page. A basic item form page
          <ItemDetailsPage
            {...props}
          />
        );
      case 1:
        return (
          //Second page. Not started. Supposed to be an image upload page or something.
          <ImagesUploadPage
            {...props}
          />
        );
      case 2:
        //Final page. It was supposed to be a confirm details page.
        return 'Confirm Details';
      default:
        return 'ERROR PAGE NOT FOUND';
    }
  };

  //Changes page based on what the user clicked on
  handleStep = index => {
    this.pageValidate();
    this.setState({activeStep: index});
  };
  //Goes 1 page forward unless you're on the last page
  handleStepNext = () => {
    this.pageValidate();
    this.state.activeStep !== 2 && this.setState({activeStep: this.state.activeStep + 1});
  };

  //Goes 1 page backwards unless if you're on the first page
  handleStepBack = () => {
    this.pageValidate();
    this.state.activeStep !== 0 && this.setState({activeStep: this.state.activeStep - 1});
  };

  //Supposed to validate all the pages and makes sure all the details are filled in. If a page does have all their
  //respective details filled in, then the state changes which change the page to a green check mark.
  //Right now, its set to trigger when a change is completed (onBlur()) or when pages go forward/backward...
  //This could definitely be improved
  pageValidate = () => {
    const {itemname, price, stock, role} = this.state.form;
    const StepOneValidated = !!itemname && !!price && !!stock && !!role;
    this.setState({completed: {0: StepOneValidated, 1: true, 2: true}});

  };

  //This checks all the values first and makes sure all details are filled before calling the handleCreateListing()
  handleSubmit = (e) => {
    const {completed} = this.state;
    this.pageValidate();
    if (!(completed[0] && completed[1] && completed[2])) {
      e.stopPropagation()
    } else {
      this.handleCreateListing();
    }
  };

  //Resets the states to original values
  reset = () => {
    this.setState({
      activeStep: 0,
      completed: {0: false, 1: false, 2: false},
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
    })
  };

  render() {
    const {classes} = this.props;
    const {activeStep, completed} = this.state;
    const disabled = !(completed[0] && completed[1] && completed[2]);

    return (
      <div>
        {/*New Listing Button that sits on the header component. This should be a separate button that
         passes props to this form component*/}
        <div>
          <Button size="small" onClick={this.handleOpen} className={classes.button}>
            <PlusIcon className={classes.icon}/>
            &nbsp;Create New
          </Button>
        </div>

        <div>
          {/*Actual form component*/}
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
              {/*Stepper - shows which page you are on*/}
              <PageSteps
                handleStep={this.handleStep}
                activeStep={this.state.activeStep}
                completed={this.state.completed}
              />
              {/*Contents of the page*/}
              <div>
                {this.getStepContent(activeStep)}
              </div>
              {/*Clears and resets the form*/}
              <Button
                variant='contained'
                onClick={this.reset}
                className={classes.ResetButton}
              >
                Reset
              </Button>
              {/*The set of buttons to go forward, backwards, and submit the form*/}
              <div className={classes.ButtonPosition}>
                <Button
                  variant='contained'
                  disabled={activeStep === 0}
                  onClick={this.handleStepBack}
                  className={classes.BackButton}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  disabled={activeStep === 2}
                  onClick={this.handleStepNext}
                  className={classes.NextButton}
                >
                  Next
                </Button>
                <Button
                  disabled={disabled}
                  color="primary"
                  variant="outlined"
                  onClick={this.handleSubmit}
                >
                  Submit
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
};

export default withStyles(styles)(Form)

