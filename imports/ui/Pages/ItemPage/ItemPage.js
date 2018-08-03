import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Listings from "../../../api/Listings/Listings";
import {withTracker} from 'meteor/react-meteor-data';
import Loading from '../../Components/Loading';
import Fade from '@material-ui/core/Fade'
import Bid from './Bid'
import ItemDetails from './ItemDetails';
import Grid from '@material-ui/core/Grid'

const styles = () => (
  {
    root: {
      flexGrow: 1,
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    GridContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      padding: 50,
      paddingRight: 0,
    },
    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    ItemDetails: {
    },
    Bid: {
    }
  }
);

//The ItemPage is the page people see after clicking on a listing item. It will show all the details of the item and
//the ability to bid on the item
class ItemPage extends Component {
  //A reference for components like the sidebar to know what the page is currently on
  componentDidMount() {
    this.props.handleChange('CurrentPage', 'ItemPage');
  }

  //This is to change the page when the page changes. The reason for this is that if you don't do this, the component
  //doesn't realize that the page had changed so it doesn't change.
  //Looking at it now, I think I can just do this.props.history.push() to change the page however that does take extra
  //loading time so ... this works
  shouldComponentUpdate(nextProps) {
    const {listingId} = queryString.parse(this.props.location.search);
    if (nextProps.item) {
      return (nextProps.item._id === listingId);
    } else {
      return false
    }
  }

  render() {
    const {classes, loading, item, history} = this.props;
    return (
      !loading ?
        <Fade in={true} timeout={200}>
          <div className={classes.root}>
            <img src={item.BannerImage} className={classes.image}/>
            <Grid container spacing={40} alignItems={'center'} justify={"space-between"} className={classes.GridContainer}>
              <Grid item md={6} sm={12} className={classes.ItemDetails}>
                {/*Details of the item*/}
                <ItemDetails
                  item={item}
                />
              </Grid>
              <Grid item md={6} sm={12} className={classes.Bid}>
                {/*Form to bid on the item*/}
                <Bid
                  item={item}
                  history={history}
                />
              </Grid>
            </Grid>
          </div>
        </Fade> :
        <Loading/>
    )
  }
}

ItemPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  item: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const {listingId} = queryString.parse(props.location.search);
  const itemSubscription = Meteor.subscribe('item', listingId);
  return {
    loading: !itemSubscription.ready(),
    item: Listings.findOne(),
  }
})(withStyles(styles)(ItemPage))