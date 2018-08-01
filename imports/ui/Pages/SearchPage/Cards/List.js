import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = {
  Paper: {
    margin: 15,
    padding: 10,
  }
};

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
        <Link to={{pathname: '/item', search: `?listingId=${item._id}`}}>
          <Paper className={classes.Paper}>
            <Grid container>
              <Grid item xs={3}>
                <Typography>
                  {item.itemname}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  ${item.price.toFixed(2)} per {item.unit}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  {item.stock.toFixed(2)} {item.unit}{item.stock > 1 && 's'} left in stock
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>
                  {created}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Link>
      </Fade>
    );
  }
}


List.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(List)
