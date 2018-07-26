import React, {Fragment, Component} from 'react';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import {withTheme, withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import theme from '../../Theme'

const styles = theme => ({
  root: {
    fontSize: 15,
  },
  smallIcon: {
    fontSize: 25,
  },
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
    const {anchorEl} = this.state;

    return (
      <Fragment>
        <Button
          size='small'
          className={classes.root}
          onClick={this.handleClick}
          // aria-label="More"
          // aria-owns={anchorEl ? 'long-menu' : null}
          // aria-haspopup="true"
        >
          <SortIcon className={classes.smallIcon}/>
          Sort
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
      </Fragment>
    )
  }
}


Sorter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withTheme()(withStyles(styles)(Sorter))

