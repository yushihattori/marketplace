import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import Messages from '../../../../api/Messages';
import Listings from "../../../../api/Listings";
import Loading from '../../../Components/Loading';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'

const styles = theme => (
  {
    root: {
      flexGrow: 1,
    },
    Container: {
      width: '60%',
      margin: 20,
    },
    Status: {
      color: 'red',
    },
    New: {
      display: 'flex',
    },
    Message: {
      wordWrap:'break-word'
    }
  }
);

class OfferMessage extends Component {

  scrollToBottom = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: "auto"});
  };

  componentDidMount() {
    this.scrollToBottom();

  };

  componentDidUpdate() {
    this.scrollToBottom();
  };


  render() {
    const {classes, messages, loading} = this.props;
    return (
      !loading ?
        <div className={classes.root}>
          {messages.map(message => {
            const text = {
              color: 'black',
            };
            const Paper = {
              backgroundColor: 'blue',
            };
            return (
              <Paper key={message._id} className={classes.Container} style={Paper}>
                <Grid container key={message} direction={'row'}>
                  <Grid container item xs={12} justify={"space-between"}>
                    <Typography style={text}>
                      {message.username}
                    </Typography>
                    <Typography className={classes.Status} style={text}>
                      {message.Status}
                    </Typography>
                  </Grid>
                  <Grid container item spacing={40} xs={12} alignItems={'center'} className={classes.New}>
                    <Grid item>
                      <Typography style={text}>
                        {message.Price === -1 ? '' : `New Price: ${message.Price}`}
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography style={text}>
                        {message.Qty === -1 ? '' : `New Quantity: ${message.Qty}`}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.Message} style={text}>
                      {message.Message}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            )
          })}
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div> : <Loading/>
    )
  }
}

OfferMessage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker((props) => {
  const {OfferId} = props;
  const messagesSubscription = Meteor.subscribe('messages', OfferId);
  return {
    loading: !messagesSubscription.ready(),
    messages: Messages.find({"OfferId": OfferId}).fetch(),
  }
})(withStyles(styles)(OfferMessage))

