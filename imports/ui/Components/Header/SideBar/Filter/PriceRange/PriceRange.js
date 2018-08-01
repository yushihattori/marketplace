import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import RangeSlider from './RangeSlider';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MoneyIcon from '@material-ui/icons/AttachMoney';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  textField: {
    maxWidth: 100,
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    paddingBottom: 3,
  },
  header: {
    fontSize: 18
  },
  title:{
    display: 'flex',

  }
});


class PriceRange extends Component {
  state = {
    min: this.props.priceRange.min,
    max: this.props.priceRange.max,
  };

  handleNumberChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/[^\d.]/g, '')
    });
  };

  handleLeave = () => {
    this.props.handleFilterChange('priceRange', this.state)
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleLeave();
    }
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <div className={classes.title}>
          <MoneyIcon/>
          <Typography variant={"headline"} className={classes.header}>
            Price Range:
          </Typography>
        </div>
        <div className={classes.root}>
          <TextField
            id='min'
            className={classes.textField}
            value={this.state.min}
            onChange={this.handleNumberChange('min')}
            onKeyPress={this.handleKeyPress}
            placeholder='min'
            onBlur={this.handleLeave}
            InputProps={{
              // disableUnderline: true,
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              classes: {input: classes.input}
            }}
          />
          <Typography style={{paddingTop: 10, fontWeight: 'bold'}}>
            &nbsp; - &nbsp;
          </Typography>
          <TextField
            id='max'
            className={classes.textField}
            value={this.state.max}
            onChange={this.handleNumberChange('max')}
            placeholder='max'
            // margin='normal'
            onBlur={this.handleLeave}
            onKeyPress={this.handleKeyPress}
            InputProps={{
              // disableUnderline: true,
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              classes: {input: classes.input}
            }}
          />
        </div>
      </div>
    )
  }
}

PriceRange.propTypes = {
  classes: PropTypes.object.isRequired,
  priceRange: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(PriceRange)
