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
import Collapse from '@material-ui/core/Collapse'
import theme from '../../../Theme'

const styles = () => (
  {
    username: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    typography: {
      fontSize: 18,
    },
    messages: {
      flex: 1,
      height: 400,
      overflow: 'auto',
    },
    newMessage: {
      paddingLeft: 10,
    },
    OfferChange: {
      color: theme.palette.primary.main,
      fontStyle: 'italic',
    }
  }
);

class Panel extends Component {
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

  scrollToBottom = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView({block: "end", behavior: "auto"})
  };

  componentDidUpdate() {
    this.scrollToBottom();
  };

  render() {
    const {OfferChangeRender} = this;
    const {classes, offer, expanded, ClickedId, handleChange, updateOffer, listing} = this.props;
    const {username, PriceOffer, QtyOffer, _id, Message, MessageUser, OfferChange, PriceOfferId, QtyOfferId} = offer;
    return (
      <ExpansionPanel
        expanded={expanded === _id}
        onChange={handleChange(_id)}
        CollapseProps={{
          unmountOnExit: true,
        }}>
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
                {QtyOffer} {listing.unit}{QtyOffer>1 && 's'}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography className={classes.typography}>
                {`${MessageUser}: `}
                <span className={classes.OfferChange}>
                  {OfferChangeRender(OfferChange, PriceOffer, QtyOffer, listing.unit)}
                </span>
                {Message ? Message.substr(0, 150) : ''}
                {Message && Message.length > 150 && '...'}

              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction={"column"}>
            <Collapse in={expanded === offer._id}>
              <div className={classes.messages}>
                <OfferMessage
                  OfferId={offer._id}
                  ListingId={ClickedId}
                  expanded={expanded}
                  PriceOfferId={PriceOfferId}
                  QtyOfferId={QtyOfferId}
                />
              </div>
            </Collapse>
            <div className={classes.newMessage}>
              <NewMessage OfferId={offer._id} updateOffer={updateOffer}/>
            </div>
            <div style={{float: "left", clear: "both"}}
                 ref={(el) => {
                   this.messagesEnd = el;
                 }}>
            </div>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Panel)
