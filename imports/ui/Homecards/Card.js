import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import listings from '../../api/listings';

export default class Task extends Component {
    render() {
        return (
            <Card style={{width: '300px', margin: '5px'}}>
                <CardMedia
                    style={{height: 0, paddingTop: '56.25%',}}
                    title={this.props.item.itemname}
                    image={this.props.item.image||'/noimage.svg'}
                />
                <CardContent>
                    <Typography>
                        {this.props.item.itemname}
                    </Typography>
                    <Typography>
                        ${this.props.item.price} per {this.props.item.unit}
                    </Typography>
                </CardContent>
            </Card>);
    }
}


