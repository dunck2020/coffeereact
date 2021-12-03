import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import useForm from "./useForm"
import { connect } from "react-redux";
import * as actions from "../actions/customer";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          minWidth: 230,
        },
      },
      smallMargin:{
        margin: theme.spacing(1),
      }
})

const initialFieldValues = {
    customerName : '',
    customerEmail : '',
    customerPhone : '',
    rewardPointTotal: ''
}

const CustomerForm = ({classes, ...props}) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if('customerName'in fieldValues)
            temp.customerName = fieldValues.customerName ? "" : "This field is required"
        if('customerPhone' in fieldValues)
            temp.customerPhone = fieldValues.customerPhone ? "" : "This field is required"
        if('rewardPointTotal' in fieldValues)
            temp.rewardPointTotal = fieldValues.rewardPointTotal ? "" : "This field is required"
        if('customerEmail' in fieldValues)
            temp.customerEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValues.customerEmail) ? "" : "Email is not valid"

        setErrors({
            ...temp
        })
        
        if(fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFieldValues, validate)

    const handleSubmit = e => {
        e.preventDefault()
        if(validate())
        {
            if(props.currentId==0)
                props.createCustomer(values, ()=>{window.alert("Inserted")})
            else
                props.updateCustomer(props.currentId,values,()=>{window.alert("Updated")})
        }
    }

    useEffect(()=> {
        if( props.currentId != 0)
        setValues({
            ...props.CustomerList.find(x => x.id == props.currentId)
        })
        setErrors({})
    }, [props.currentId])

    return( 

    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
                <TextField
                    name="customerName"
                    variant="outlined"
                    label="Customer Name"
                    value = {values.customerName}
                    onChange={handleInputChange}
                    {...(errors.customerName && {error:true, helperText: errors.customerName})}
                />
                <TextField
                    name="customerEmail"
                    variant="outlined"
                    label="Customer Email"
                    value = {values.customerEmail}
                    onChange={handleInputChange}
                />
                <TextField
                    name="customerPhone"
                    variant="outlined"
                    label="Customer Phone"
                    value = {values.customerPhone}
                    onChange={handleInputChange}
                    {...(errors.customerPhone && {error:true, helperText: errors.customerPhone})}
                />
                <TextField
                    name="rewardPointTotal"
                    variant="outlined"
                    label="Reward Points"
                    value = {values.rewardPointTotal}
                    onChange={handleInputChange}
                    {...(errors.rewardPointTotal && {error:true, helperText: errors.rewardPointTotal})}
                />
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smallMargin}
                        >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        type="reset"
                        className={classes.smallMargin}
                        >
                        Reset
                    </Button>
                </div>
            </Grid>
        </Grid>
    </form>
    
    )
}
const mapStateToProps = state =>({
    CustomerList: state.Customer.list
})

const mapActionToProps = {
    createCustomer: actions.create,
    updateCustomer: actions.update
}
export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(CustomerForm));