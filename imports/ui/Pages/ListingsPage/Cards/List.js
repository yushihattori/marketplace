import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Paper: {
    margin: 15,
    padding: 10,
    width: '75%',
  },
  Link: {
    textDecoration: 'none',
  },
  ItemName: {
    fontSize: 20,
  },
  Image: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    display: 'flex',
  },
  Created: {
    fontSize: 16
  },
  details: {
    fontSize: 18,
    color: 'black',
  },
  Value: {
    fontSize: 18
  },
  CreatedContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  role: {
    fontSize: 16,
    color: 'grey',
  }
};

//The list card view
class List extends Component {

  render() {
    const {classes, item} = this.props;
    const timeout = 100;
    const created = item.createdAt.toLocaleString([], {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });

    return (
      <Fade in={true} timeout={timeout}>
        <div className={classes.root}>
          <Paper className={classes.Paper}>
            <Link className={classes.Link} to={{pathname: '/item', search: `?listingId=${item._id}`}}>
              <Grid container>
                <Grid item xs={3} className={classes.title}>
                  <div className={classes.Image}>
                    <img src={item.CardImage}/>
                  </div>
                  <div>
                    <Typography variant={"headline"} className={classes.ItemName}>
                      {item.itemname}
                    </Typography>
                    <Typography className={classes.role}>
                      {item.role === "seller" && `Sold by ${item.username}`}
                      {item.role === "buyer" && `Bought by ${item.username}`}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs>
                  <Typography variant={"title"} className={classes.Value}>
                    ${item.price.toFixed(2)} per {item.unit}
                  </Typography>
                  <Typography variant={"title"} className={classes.Value}>
                    {item.stock.toFixed(2)} {item.unit}{item.stock > 1 && 's'} left in stock
                  </Typography>
                </Grid>
                <Grid item xs={5} className={classes.details}>
                  {item.details && item.details.substr(0, 200)}
                  {item.details && item.details.length >= 200 ? '...' : ''}
                </Grid>
                <Grid item xs={1} className={classes.CreatedContainer}>
                  <Typography variant={"caption"} className={classes.Created}>
                    {created}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          </Paper>
        </div>
      </Fade>
    );
  }
}


List.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(List)
