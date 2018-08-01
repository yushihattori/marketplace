import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import {withTheme, withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import theme from '../../../../Theme'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  button: {
    fontSize: 15,
    color: 'black',
  },
  smallIcon: {
    fontSize: 25,
    paddingRight: 3,
  },
  header: {
    fontSize: 18,
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  }
});

const options = [
  {
    value: {createdAt: -1},
    label: 'Newest',
  },
  {
    value: {createdAt: 1},
    label: 'Oldest',
  },
  {
    value: {createdAt: -1},
    label: 'Trending',
  },
  {
    value: {createdAt: -1},
    label: 'Most Popular',
  },
  {
    value: {price: 1},
    label: 'Price: Low to High',
  },
  {
    value: {price: -1},
    label: 'Price: High to Low',
  },
  {
    value: {lowercaseName: 1},
    label: 'A - Z',
  },
  {
    value: {lowercaseName: -1},
    label: 'Z - A',
  },
];

class Sorter extends Component {
  state = {
    anchorEl: null,
    selectedIndex: 0,
  };

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleSortClick = (event, index) => {
    this.setState({selectedIndex: index, anchorEl: null}, () => {
      this.props.handleChange('sort', options[index].value);
    });
  };

  render() {
    const {classes} = this.props;
    const {anchorEl, selectedIndex} = this.state;
    return (
      <div>
        <div className={classes.title}>
          <SortIcon className={classes.smallIcon}/>
          <Typography variant={"headline"} className={classes.header}>
            Sort by:
          </Typography>
        </div>
        <Button
          variant={"outlined"}
          size='small'
          className={classes.button}
          onClick={this.handleClick}
        >
          {options[selectedIndex].label}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              style={{fontSize: 18}}
              key={option.label}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleSortClick(event, index)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}


Sorter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withTheme()(withStyles(styles)(Sorter))

