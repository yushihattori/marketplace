import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import {Link} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  title: {
    fontSize: 16,
    textDecoration: 'none',
    height: 40,
  },
  subheader: {
    fontSize: 14,
    color: 'black',
  },
  content: {
    margin: 8,
    height: 130,
  },
  media: {
    width: '100%',
    height: 200,
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

//The normal card view
class NormalCard extends Component {

  render() {
    const {classes, item} = this.props;

    const created = item.createdAt.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const timeout = 100;
    const defaultImage = "/noimage.png";

    const image = item.CardImage;
    return (
      <Fade in={true} timeout={timeout}>
        <div>
          <Card>
            <Link
              to={{
                pathname: '/item',
                search: `?listingId=${item._id}`
              }}
            >
              <CardMedia
                className={classes.media}
                title={item.itemname}
                image={image ? image : defaultImage}
              />
            </Link>
            <div className={classes.content}>
              <div>
                <Link
                  to={{
                    pathname: '/item',
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
                  {item.role === "seller" && `Sold by ${item.username}`}
                  {item.role === "buyer" && `Bought by ${item.username}`}
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

NormalCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};
export default withStyles(styles)(NormalCard)
