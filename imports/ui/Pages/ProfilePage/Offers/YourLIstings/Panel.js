import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import OfferMessage from '../Components/OfferMessage';
import NewMessage from '../Components/NewMessage';
import theme from '../../../../Theme'
import Loading from '../../../../Components/Loading';
import UserAgreeIcon from '../Components/UserAgreeIcon';

const styles = () => (
  {
    details: {
      height: 500
    },
    username: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    typography: {
      fontSize: 18,
    },
    messages: {
      flex: 1,
      overflow: 'auto',
    },
    newMessage: {
      paddingLeft: 10,
      marginBottom: 10,
    },
    OfferChange: {
      color: theme.palette.primary.main,
      fontStyle: 'italic',
    },
    outline: {
      outline: "1px solid LightGrey"
    },
    bothChecksContainer: {
      display: 'flex',
    },
    AgreeStyle: {
      color: 'green',
      fontStyle: "italic"
    }
  }
);

class Panel extends Component {
  state = {
    TimedOut: false,
  };
  OfferChangeRender = (OfferChange, PriceOffer, QtyOffer, unit) => {
    switch (OfferChange) {
      case 'both':
        return <span>
          {`Offer: ${QtyOffer} ${unit}${QtyOffer > 1 ? 's' : ''} at $${PriceOffer} per ${unit} `}</span>;
      case 'price':
        return <span>{`Offer: $${PriceOffer} per ${unit} `}</span>;
      case 'qty':
        return <span>{`Offer: ${QtyOffer} ${unit}${QtyOffer > 1 ? 's' : ''} `}</span>;
      default:
        return null
    }
  };


  //TimedOut just removes the messages from view so the transitions in expansion panels don't stutter
  componentDidUpdate(prevProps) {
    if (prevProps.expanded !== this.props.expanded) {
      const {expanded} = this.props;
      const {TimedOut} = this.state;
      const {_id} = this.props.offer;
      const transition = theme.transitions.duration.standard;
      if (expanded === _id) {
        setTimeout(() => {
          this.setState({TimedOut: true})
        }, transition)
      } else {
        TimedOut && this.setState({TimedOut: false})
      }
    }
  }


  render() {
    const {TimedOut} = this.state;
    const {OfferChangeRender} = this;
    const {classes, offer, expanded, ClickedId, handleChange, updateOffer, listing} = this.props;
    const {
      username, PriceOffer, QtyOffer, _id, Message, MessageUser, OfferChange, PriceOfferId, QtyOfferId,
      itemId, ListingUserAgree, OfferUserAgree
    } = offer;
    return (
      ClickedId === itemId && listing ?
        <ExpansionPanel
          expanded={expanded === _id}
          onChange={handleChange(_id)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Grid container>
              <Grid item xs={2}>
                <Typography className={classes.username}>
                  {username}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography className={classes.typography}>
                  ${PriceOffer}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography className={classes.typography}>
                  {QtyOffer} {listing.unit}{QtyOffer > 1 && 's'}
                </Typography>
              </Grid>
              <Grid container justify={"space-between"} item xs>
                <Grid item xs>
                  <Typography className={classes.typography}>
                    {`${MessageUser}: `}
                    <span className={classes.OfferChange}>
                      {OfferChangeRender(OfferChange, PriceOffer, QtyOffer, listing.unit)}
                      </span>
                    {Message ?
                      Message.substr(0, 4) === "#OUA" ?
                        <span className={classes.AgreeStyle}>{Message.substr(4)}</span> :
                        `${Message.substr(0, 150)}${Message.length > 150 && '...'}` : ''}
                  </Typography>
                </Grid>
                <Grid item className={classes.bothChecksContainer}>
                  <UserAgreeIcon
                    OfferUserAgree={OfferUserAgree}
                    name={username}
                  />
                  <UserAgreeIcon
                    ListingUserAgree={ListingUserAgree}
                    name={"You"}
                  />
                </Grid>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Grid container direction={"column"} className={classes.outline}>
              <div className={classes.messages}>
                {TimedOut ?
                  <OfferMessage
                    OfferId={offer._id}
                    ListingId={ClickedId}
                    expanded={expanded}
                    PriceOfferId={PriceOfferId}
                    QtyOfferId={QtyOfferId}
                  /> : expanded === _id ? <Loading/> : ''
                }
              </div>
              <div className={classes.newMessage}>
                {TimedOut ?
                  <NewMessage
                    updateOffer={updateOffer}
                    offer={offer}
                  /> : ''}
              </div>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel> : <div>Didn't load</div>
    )
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Panel)
