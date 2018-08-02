import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ToggleButton, {ToggleButtonGroup} from '@material-ui/lab/ToggleButton';
import Typography from '@material-ui/core/Typography'
import GridIcon from '@material-ui/icons/Apps';

const styles = () => (
  {
    container: {
      marginBottom: 20,
    },
    root: {
      display: 'flex',
    },
    header: {
      fontSize: 18
    },
    typography: {
      fontSize: 16,
    },
    title: {
      display: 'flex',
      marginBottom: 5,
    },
    icon: {
      paddingRight: 3,
      fontSize: 25,
    }
  }
);

//This component is the filter that switches between list, card, and long-card views of the search page listings
class BuyerSeller extends Component {

  handleChange = alignment => {
    alignment !== null &&
    this.props.handleChange('view', alignment)
  };

  render() {
    const {classes, view} = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.title}>
          <GridIcon className={classes.icon}/>
          <Typography variant={"headline"} className={classes.header}>
            Item View:
          </Typography>
        </div>
        <div className={classes.root}>
          {/*Select between card, long-card, and list views*/}
          <ToggleButtonGroup value={view} exclusive={true} onChange={this.handleChange}>
            <ToggleButton disableRipple value={"Card"}>
              <Typography variant={"body1"} className={classes.typography}>
                Card
              </Typography>
            </ToggleButton>
            <ToggleButton disableRipple value={"Long Card"}>
              <Typography variant={"body1"} className={classes.typography}>
                Long Card
              </Typography>
            </ToggleButton>
            <ToggleButton disableRipple value={"List"}>
              <Typography variant={"body1"} className={classes.typography}>
                List
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    )
  }
}

BuyerSeller.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
};

export default withStyles(styles)(BuyerSeller)