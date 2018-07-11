import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import {withTheme, withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = {
    card: {
        width: 300,
        marginTop: 25,
        margin: 5,
    },
    cardHeader: {
        height: 30,
    },
    titleBox: {
        height: '55px',
    },
    title: {
        fontSize: 16,
    },
    subheader: {
        fontSize: 14,
        color: 'black',
    },
    content: {
        margin: 8,
        height: 175,
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
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
        const {classes} = this.props;
        const item = this.props.item;

        const created = item.createdAt.toLocaleString([], {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        title={item.itemname}
                        image={item.image || '/noimage.svg'}
                    />
                    <div style={{position: 'relative'}} className={classes.content}>
                        <div className={classes.titleBox}>
                            <Typography
                                variant={'title'}
                                className={classes.title}
                            >
                                {item.itemname}
                            </Typography>
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
                                {item.stock} {item.unit}{item.stock > 1 && 's'} left in stock
                            </Typography>
                        </div>
                        <div style={{position: 'absolute', bottom: '0px'}}>
                            <Typography variant='body1' className={classes.created}>
                                Posted {created}
                            </Typography>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}


ListingCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(ListingCard))

