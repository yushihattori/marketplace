import React, {Fragment, Component} from 'react';
import {withTheme, withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import theme from '../../../../Theme';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  Fields: {
    marginLeft: '40px'
  },
  role: {
    display: 'flex',
    flexDirection: 'row',
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
    width: '150px',
    height: '150px',
    paddingTop: '10px',
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

class ItemDetailsPage extends Component {
  render() {

    const {props} = this;
    const {form, image, classes} = this.props;

    return (
      <div>
        <div>
          <Grid container spacing={0} className={classes.Fields}>

            {/*Role Picker*/}
            <Grid container item sm={12} className={classes.role}>
              <div>
                <div className={classes.roleTitle}>Your Role*</div>
                <FormControlLabel
                  classes={{label: classes.roleLabel}}
                  label={'Seller'}
                  control={
                    <Radio
                      color='primary'
                      checked={form.role === 'seller'}
                      onChange={props.handleChange('role')}
                      value="seller"
                    />}
                />
                <FormControlLabel
                  classes={{label: classes.roleLabel}}
                  className={classes.FormControlLabel}
                  label={'Buyer'}
                  control={
                    <Radio
                      color='primary'
                      checked={form.role === 'buyer'}
                      onChange={props.handleChange('role')}
                      value="buyer"
                    />}
                />
              </div>
            </Grid>

            {/*Item Name*/}
            <Grid item sm={11}>
              <TextField
                id='item-name'
                label={`Item Name${form.itemname.length > 80 ? ' - 80 characters limit' : ''}`}
                value={form.itemname}
                onChange={props.handleChange('itemname')}
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
                value={form.stock}
                onChange={props.handleNumberChange('stock')}
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
                value={form.unit}
                onChange={props.handleChange('unit')}
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
                    {form.stock > 1 ? option.value + 's' : option.value}
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
                label={'Price per ' + form.unit}
                value={form.price}
                onChange={props.handleNumberChange('price')}
                placeholder='Price'
                helperText='Price of item per unit'
                margin='normal'
                InputProps={{
                  classes: {input: classes.textFieldInput},
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
                value={form.currency}
                onChange={props.handleChange('currency')}
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
                    checked={form.allowCounterOffers}
                    onChange={props.handleChecked('allowCounterOffers')}
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
                value={form.details}
                placeholder='Give additional details such as quality, weight, etc...'
                margin="normal"
                onChange={props.handleChange('details')}
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
                <img src={image ? URL.createObjectURL(image) : '/upload.jpg'} className={classes.image}/>
              </label>
              <input
                accept="image/*"
                id="image-upload"
                className={classes.upload}
                type="file"
                onChange={props.handleUpload}
              />
              <label htmlFor="image-upload">
                <Button color="primary" component="span" variant="outlined">
                  Upload Image
                </Button>
              </label>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

ItemDetailsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ItemDetailsPage)

