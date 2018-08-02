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
import NewMessage from '../Components/NewMessage/NewMessage';
import theme from '../../../../Theme'
import Loading from '../../../../Components/Loading';
import UserAgreeIcon from '../Components/UserAgreeIcon';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper'
import AcceptOffer from '../Components/AcceptOffer';

const styles = () => (
  {
    details: {
      height: 600
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
      justifyContent: 'flex-end'
    },
    AgreeStyle: {
      color: 'green',
      fontStyle: "italic"
    },
    StartTrade: {
      width: '100%',
      backgroundColor: theme.palette.primary.main
    },
    StartTradeLabel: {
      color: 'white'
    }
  }
);

class Panel extends Component {
  state = {
    TimedOut: false,
  };
  //Show a different message based on if you have price offer, qty offer, or both.
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
    const {classes, offer, expanded, ClickedId, handleChange, listing} = this.props;
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
          {/*The main header component that shows the information before the panel is clicked on*/}
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Grid container alignItems={"center"}>
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
              <Grid container justify={"space-between"} alignItems={"center"} zeroMinWidth item xs>
                <Grid item xs={10}>
                  <Typography className={classes.typography}>
                    {`${MessageUser}: `}
                    <span className={classes.OfferChange}>
                      {/*Different render based on PriceOffer, QtyOffer*/}
                      {OfferChangeRender(OfferChange, PriceOffer, QtyOffer, listing.unit)}
                      </span>
                    {/*#OUA changes the color of message to green based on the string #OUA at the beginning >> Not a very good idea but oh well*/}
                    {Message ?
                      Message.substr(0, 4) === "#OUA" ?
                        <span className={classes.AgreeStyle}>{Message.substr(4)}</span> :
                        `${Message.substr(0, 150)}${Message.length > 150 ? '...' : ''}` : ''}
                  </Typography>
                </Grid>
                <Grid item xs={2} className={classes.bothChecksContainer}>
                  {/*Icons of which users have agreed currently*/}
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
          {/*The messages and newMessage components after the panel is clicked on*/}
          <ExpansionPanelDetails className={classes.details}>
            {TimedOut &&
            <Grid container direction={"column"} className={classes.outline}>
              {/*This message shows when both users have agreed. This was just a test idea*/}
              {offer.OfferUserAgree && offer.ListingUserAgree &&
              <ButtonBase>
                <Paper elevation={1} square className={classes.StartTrade}>
                  <Typography className={classes.StartTradeLabel}>
                    Both users have agreed. Click here to start the trade.
                  </Typography>
                </Paper>
              </ButtonBase>
              }
              {/*AcceptOffer button*/}
              <AcceptOffer offer={offer}/>
              <div className={classes.messages}>
                {TimedOut ?
                  //All the messages for this offer
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
                  //Create new message component
                  <NewMessage
                    offer={offer}
                  /> : ''}
              </div>
            </Grid>
            }
          </ExpansionPanelDetails>
        </ExpansionPanel> : <div>Loading</div>
    )
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
  offer: PropTypes.object.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ClickedId: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  listing: PropTypes.object,
};

export default withStyles(styles)(Panel)
