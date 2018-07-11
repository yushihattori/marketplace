import React, {Fragment, Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {withTheme, withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import theme from '../Theme';
import {Meteor} from 'meteor/meteor';

const styles = theme => ({
    button: {
        fontSize: '19px',
        color: 'white',
    },
    form: {
        width: '800px',
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '10px',
        justify: 'flex-start',
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        marginTop: '7px',
    },
    Fields: {
        marginLeft: '40px'
    },
    roleLabel: {
        fontSize: 17,
    },
    roleTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    textFieldLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    textFieldInput: {
        fontSize: 18,
    },
    textFieldHelper: {
        fontSize: 12,
    },
    checkbox: {
        paddingTop: '30px',
    },
    checkboxLabel: {
        fontSize: 17,
    },
    upload: {
        display: 'none',
    },
    uploadBox: {
        paddingRight: '50px'
    },
    image: {
        width: '200px',
        height: '200px',
        paddingTop: '10px',
    },
    role: {
        display: 'flex',
        flexDirection: 'row',
    },

});

const units = [
    {
        value: 'ton',
    },
    {
        value: 'lb',
    },
    {
        value: 'kg',
    },
    {
        value: 'item'
    }
];

const currencies = [
    {
        value: 'USD'
    },
    {
        value: 'JPY'
    },
    {
        value: 'AUD'
    },
    {
        value: 'GBP'
    },
    {
        value: 'CAN'
    },
];

class Form extends Component {
    state = {
        open: false,
        itemname: '',
        price: '',
        stock: '',
        unit: 'ton',
        currency: 'USD',
        details: '',
        role: 'seller',
        allowCounterOffers: true,
    };
    handleOpen = () => {
        this.setState({open: true})

        //    LATER ADD IN FEATURE WHERE WHEN CLICK NEW LISTING, YOU JUST CLEAR THIS FORM. THEN ADD A TAB FEATURE WHERE WHEN U CLICK EXCAPE, YOU JUST LEAVE A TAB TO CONTINUE WORKING
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleNumberChange = name => event => {
        this.setState({
            [name]: event.target.value.replace(/[^\d.]/g, '')
        });
    };

    handleChecked = name => event => {
        this.setState({[name]: event.target.checked});
    };

    handleUpload = event => {
        this.setState({image: URL.createObjectURL(event.target.files[0])})
    };

    handleCreateListing = () => {
        this.setState({
            price: parseFloat(this.state.price),
            stock: parseFloat(this.state.stock),
        }, () => Meteor.call('listings.insert', this.state));


        this.handleClose()
    };


    render() {
        const {classes} = this.props;

        return (
            <div>

                {/*New Listing Button*/}
                <div>
                    <Button size="small" color="secondary" onClick={this.handleOpen}>
                        <Typography variant='button' className={classes.button}>
                            Create New Listing
                        </Typography>
                    </Button>
                </div>


                <div>
                    <Drawer open={this.state.open} anchor='right' onClose={this.handleClose}>
                        <div className={classes.form}>

                            {/*Close Button*/}
                            <div className={classes.header}>
                                <IconButton onClick={this.handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                                <Typography className={classes.title}>
                                    {this.state.itemname.substring(0, 40) || 'New Listing'}
                                    {this.state.itemname.length > 40 && '...'}
                                </Typography>
                            </div>


                            <div>
                                <Grid container spacing={0} className={classes.Fields}>

                                    {/*Role Picker*/}
                                    <Grid container item sm={12} className={classes.role}>
                                        <div>
                                            <div className={classes.roleTitle}>Your Role*</div>
                                            <FormControlLabel
                                                classes={{label: classes.roleLabel}}
                                                control={<Radio
                                                    checked={this.state.role === 'seller'}
                                                    onChange={this.handleChange('role')}
                                                    value="seller"
                                                />} label={'Seller'}/>
                                            <FormControlLabel
                                                classes={{label: classes.roleLabel}}
                                                control={<Radio
                                                    checked={this.state.role === 'buyer'}
                                                    onChange={this.handleChange('role')}
                                                    value="buyer"
                                                />} label={'Buyer'}/>
                                        </div>
                                    </Grid>

                                    {/*Item Name*/}
                                    <Grid item sm={11}>
                                        <TextField
                                            id='item-name'
                                            label={`Item Name${this.state.itemname.length > 80 ? ' - 80 characters limit' : ''}`}
                                            value={this.state.itemname}
                                            onChange={this.handleChange('itemname')}
                                            placeholder='Enter item name here'
                                            helperText='Give a descriptive name'
                                            margin='normal'
                                            autoFocus={true}
                                            InputProps={{classes: {input: classes.textFieldInput}}}
                                            InputLabelProps={{shrink: true, className: classes.textFieldLabel}}
                                            FormHelperTextProps={{className: classes.textFieldHelper}}
                                            fullWidth
                                            required
                                        />
                                    </Grid>

                                    {/*Spacing*/}
                                    <Grid item sm={1}/>

                                    {/*Stock*/}
                                    <Grid item sm={2}>
                                        <TextField
                                            id='stock'
                                            label='Stock'
                                            value={this.state.stock}
                                            onChange={this.handleNumberChange('stock')}
                                            placeholder='Stock amount'
                                            helperText='Amount of stock available'
                                            margin='normal'
                                            InputProps={{classes: {input: classes.textFieldInput}}}
                                            InputLabelProps={{shrink: true, className: classes.textFieldLabel}}
                                            FormHelperTextProps={{className: classes.textFieldHelper}}
                                            required
                                            fullWidth

                                        />
                                    </Grid>

                                    {/*Units*/}
                                    <Grid item sm={1}>
                                        <TextField
                                            id='units'
                                            label=' '
                                            select
                                            value={this.state.unit}
                                            onChange={this.handleChange('unit')}
                                            margin='normal'
                                            InputProps={{classes: {input: classes.textFieldInput}}}
                                            InputLabelProps={{shrink: true, className: classes.textFieldLabel}}
                                            FormHelperTextProps={{className: classes.textFieldHelper}}
                                            fullWidth
                                            SelectProps={{
                                                native: true,
                                                MenuProps: {
                                                    className: classes.textFieldInput,
                                                },
                                            }}>
                                            {units.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {this.state.stock > 1 ? option.value + 's' : option.value}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    {/*Spacing*/}
                                    <Grid item sm={1}/>

                                    {/*Price*/}
                                    <Grid item sm={3}>
                                        <TextField
                                            id='price'
                                            label={'Price per ' + this.state.unit}
                                            value={this.state.price}
                                            onChange={this.handleNumberChange('price')}
                                            placeholder='Price'
                                            helperText='Price of item per unit'
                                            margin='normal'
                                            InputProps={{
                                                classes: {
                                                    input: classes.textFieldInput
                                                },
                                                // endAdornment:<InputAdornment position="end">{this.state.unit}</InputAdornment>,
                                            }}
                                            InputLabelProps={{shrink: true, className: classes.textFieldLabel}}
                                            FormHelperTextProps={{className: classes.textFieldHelper}}
                                            required
                                            fullWidth
                                        />
                                    </Grid>

                                    {/*Currency Selector*/}
                                    <Grid item sm={1}>
                                        <TextField
                                            id='currency'
                                            label=' '
                                            select
                                            value={this.state.currency}
                                            onChange={this.handleChange('currency')}
                                            margin='normal'
                                            InputProps={{classes: {input: classes.textFieldInput}}}
                                            InputLabelProps={{shrink: true, className: classes.textFieldLabel}}
                                            FormHelperTextProps={{className: classes.textFieldHelper}}
                                            fullWidth
                                            SelectProps={{
                                                native: true,
                                                MenuProps: {
                                                    className: classes.textFieldInput,
                                                },
                                            }}>
                                            {currencies.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.value}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    {/*Counteroffer Checkbox*/}
                                    <Grid item sm={4}>
                                        <FormControlLabel
                                            className={classes.checkbox}
                                            classes={{label: classes.checkboxLabel}}
                                            control={
                                                <Checkbox
                                                    checked={this.state.allowCounterOffers}
                                                    onChange={this.handleChecked('allowCounterOffers')}
                                                    value='allowCounterOffers'
                                                    color='primary'
                                                />
                                            } label='Allow Counter Offers'
                                        />
                                    </Grid>

                                    {/*Additional Details*/}
                                    <Grid item sm={11}>
                                        <TextField
                                            id='details'
                                            label='Additional Details'
                                            multiline
                                            rows="5"
                                            value={this.state.details}
                                            placeholder='Give additional details such as quality, weight, etc...'
                                            margin="normal"
                                            onChange={this.handleChange('details')}
                                            InputProps={{classes: {input: classes.textFieldInput}}}
                                            InputLabelProps={{shrink: true, className: classes.textFieldLabel}}
                                            fullWidth
                                        />
                                    </Grid>

                                    {/*Spacing*/}
                                    <Grid item sm={1}/>

                                    {/*Image upload*/}

                                    {/*PUT IN COMPONENT LATER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
                                    <Grid container item sm={12} direction={"column"} alignItems={'center'}
                                          className={classes.uploadBox}>
                                        <label htmlFor="image-upload">
                                            <img src={this.state.image || '/upload.jpg'} className={classes.image}/>
                                        </label>
                                        <input
                                            accept="image/*"
                                            id="image-upload"
                                            className={classes.upload}
                                            type="file"
                                            onChange={this.handleUpload}
                                        />
                                        <label htmlFor="image-upload">
                                            <Button color="primary" component="span" variant="outlined">
                                                Upload Image
                                            </Button>
                                        </label>
                                    </Grid>

                                    {/*Upload form*/}
                                    <Button color="primary" variant="outlined" onClick={this.handleCreateListing}>
                                        TEMPORARY UPLOAD LISTING
                                    </Button>
                                </Grid>
                            </div>
                        </div>
                    </Drawer>
                </div>
            </div>
        )
    }

}

Form.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Form))

