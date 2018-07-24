import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Listings from "../../../api/Listings";
import {withTracker} from 'meteor/react-meteor-data';
import Loading from '../../Components/Loading';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import Bid from './Bid'

const styles = theme => (
  {
    root: {
      flexGrow: 1,
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
    },
    form: {
      width: 800,
      right: 100,
      position: 'absolute',
      top: 400,
      opacity: 0.9,
    },
    image: {
      width: '100%',
      height: 'auto',
    },
  }
);


class ItemPage extends Component {
  componentDidMount() {
    this.props.handleChange('CurrentPage', 'ItemPage');
  }

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
            <div className={classes.form}>
              <Bid
                {...item}
                history={history}
              />
            </div>
          </div>
        </Fade> :
        <Loading/>
    )
  }
}

ItemPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  // item: PropTypes.array.isRequired,
};

export default withTracker((props) => {
  const {listingId} = queryString.parse(props.location.search);
  const itemSubscription = Meteor.subscribe('item', listingId);
  return {
    loading: !itemSubscription.ready(),
    item: Listings.findOne(),
  }
})(withStyles(styles)(ItemPage))