import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import {withRouter} from 'react-router';

const styles = {
  textField: {
    marginLeft: 10,
  },
  inputProps: {
    fontSize: 15,
    height: 15,
  },
  paper: {
    marginRight: 10,
    paddingRight: 20,
    display: 'flex',
  },
  search: {
    marginLeft: 10,
  }
};

//SearchBar component on the header that allows you to search for items.
class SearchBar extends Component {
  //When you're on a different page and you want to search you can still do it from here
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.history.push('/search');
    }
  };

  render() {
    const {classes, input, handleInputChange} = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <img src={'/baseline-search-24px.svg'} className={classes.search}/>
          <TextField
            autoFocus
            fullWidth
            value={input}
            onKeyPress={this.handleKeyPress}
            onChange={handleInputChange}
            className={classes.textField}
            InputProps={{
              disableUnderline: true,
              classes: {input: classes.inputProps},
            }}
          />
        </Paper>
      </div>
    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default withRouter(withStyles(styles)(SearchBar))