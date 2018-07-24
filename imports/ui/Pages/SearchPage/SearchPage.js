import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Cards from './Cards/Cards'
import theme from "../../Theme";
import InfiniteScroll from 'react-infinite-scroll-component';
import Typography from '@material-ui/core/Typography'

const styles = theme => (
  {
    title: {
      marginTop: -20,
      marginBottom: 20,
      marginLeft: 50,
    },
    cards: {
      marginLeft: 30,
      marginRight: 30,
    },
    toolbar: theme.mixins.toolbar,
  }
);

class SearchPage extends Component {
  state = {
    items: Array.from({length: 10})
  };

  componentDidMount() {
    this.props.handleChange('CurrentPage', 'SearchPage');
  };

  componentWillReceiveProps() {
    this.setState({items: Array.from({length: 10})})
  }

  fetchData = () => {
    this.setState({items: this.state.items.concat(Array.from({length: 10}))})
  };

  getTitle = role => {
    switch (role) {
      case 'buyer':
        return "Buyer Listings";
      case 'seller':
        return "Seller Listings";
      case 'both':
        return "Buyer & Seller Listings";
      default:
        return 'ERROR PAGE NOT FOUND';
    }
  };

  render() {
    const {props, state} = this;
    const {classes} = this.props;

    return (
      <div>
        <div className={classes.toolbar}/>
        <div>
          <Typography variant={"title"} className={classes.title}>
            {this.getTitle(props.filter.BuyerSeller)}
          </Typography>
          <div className={classes.cards}>
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchData}
              hasMore={true}
              loader={<h4>Loading...</h4>}
            >
              <Cards
                input={props.input}
                sort={props.sort}
                filter={props.filter}
                limit={state.items.length}
              />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    )
  }
}

SearchPage.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchPage)


//Change Component, Proptypes, and export Names//