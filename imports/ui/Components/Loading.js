import React from 'react';
import { withTheme, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

const Loading = (props) => (
  <div className={props.classes.loadingContainer}>
    <CircularProgress className={props.classes.progress} size={55} />
  </div>
);

export default withTheme()(withStyles(styles)(Loading));
