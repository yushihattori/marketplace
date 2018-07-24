import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {withTheme, withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import {Link} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
import Files from '../../../../api/Files';

const styles = {
  card: {
    // width: 250,
  },
  title: {
    fontSize: 16,
    textDecoration: 'none',
  },
  subheader: {
    fontSize: 14,
    color: 'black',
  },
  content: {
    margin: 8,
    // height: 175,
  },
  media: {
    width: '100%',
    height: 'auto',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stock: {
    fontSize: 15,
    color: 'red',
  },
  created: {
    fontSize: 14,
    color: 'black',
  },
  seller: {
    fontSize: 14,
    fontStyle: 'italic',
  },
};

class ListingCard extends Component {

  render() {
    const {classes, item, UploadedImage} = this.props;

    const created = item.createdAt.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    // const timeout = Math.random() * (1000 - 300) + 300;
    const timeout = 100;
    // let image = '';
    // console.log(UploadedImage)
    //
    // if (UploadedImage && UploadedImage[0]) {
    //   image = UploadedImage[0];
    // }
    // if (item.image) {
    //   image = item.image;
    // }

    const image = item.CardImage;
    return (
      <Fade in={true} timeout={timeout}>
        <div>
          <Card className={classes.card}>
            <Link
              to={{
                pathname: '/item',
                search: `?listingId=${item._id}`
              }}
            >
              <img src={image} title={item.itemname} className={classes.media}/>
            </Link>
            <div style={{position: 'relative'}} className={classes.content}>
              <div>
                <Link
                  to={{
                    pathname: '/item  ',
                    search: `?listingId=${item._id}`
                  }}
                  className={classes.title}
                >
                  <Typography
                    variant={'title'}
                    className={classes.title}
                  >
                    {item.itemname}
                  </Typography>
                </Link>
              </div>

              <div>
                <Typography variant='body1' className={classes.seller}>
                  Sold by {item.username}
                </Typography>
              </div>
              <div>
                <Typography variant='body2' className={classes.price}>
                  ${item.price.toFixed(2)} per {item.unit}
                </Typography>
              </div>
              <div>
                <Typography variant='body1' className={classes.stock}>
                  {item.stock.toFixed(2)} {item.unit}{item.stock > 1 && 's'} left in stock
                </Typography>
              </div>
              <div>
                <Typography variant='body1' className={classes.created}>
                  Posted {created}
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </Fade>
    );
  }
}


ListingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const imageId = props.item.imageId;
  const filesSubscription = Meteor.subscribe('files', imageId);
  return {
    loading: !filesSubscription.ready(),

    //This doesn't work at all and I have no clue what to do so I'm skipping it for now ///////////////////////////
    UploadedImage: Files.find().fetch(),
  }
})(withStyles(styles)(ListingCard))