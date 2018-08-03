import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Cards from './Cards/Cards'
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

//Shows all the listings and allows the user for search stuff
class ListingsPage extends Component {
  state = {
    items: Array.from({length: 18})
  };

  //Sets the page to ListingsPage for components like sidebar to know
  componentDidMount() {
    this.props.handleChange('CurrentPage', 'ListingsPage');
  };

  //When new props are given, reset the length of items shown back to 20
  componentWillReceiveProps() {
    this.setState({items: Array.from({length: 18})})
  }

  //When the scroll goes down more, fetches more data. Currently Im making an array and grabbing more by increasing
  //the length of the array but i dont know if thats a very good way of doing things...
  fetchData = () => {
    this.setState({items: this.state.items.concat(Array.from({length: 12}))})
  };

  //Shows title based on what the user wants to see
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
    const {state} = this;
    const {classes, input, sort, filter, view} = this.props;
    return (
      <div>
        <div className={classes.toolbar}/>
        <div>
          <Typography variant={"title"} className={classes.title}>
            {this.getTitle(filter.BuyerSeller)}
          </Typography>
          <div className={classes.cards}>
            {/*Package component that does the kinda cool infinite scroll thing*/}
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.fetchData}
              hasMore={true}
              loader={<h4>{' '}</h4>}
            >
              {/*All the cards and listings come from this component*/}
              <Cards
                input={input}
                sort={sort}
                filter={filter}
                view={view}
                limit={state.items.length}
              />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    )
  }
}

ListingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.string,
  sort: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
};
export default withStyles(styles)(ListingsPage)