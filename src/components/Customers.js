import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/customer";
import { Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import CustomerForm from "./CustomerForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { mergeClasses } from "@material-ui/styles";


const styles  = theme => ({
    root : {
        "& .MuiTableCell-head": {
            fontSize: "1.25em"
        }
    },
    paper :{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})
const Customers = ({classes, ...props}) => {
    
    const [currentId, setCurrentId]  = useState(0)
    useEffect(() => {
        props.fetchAllCustomers()
    }, [])
    return(
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={4} >
                    <CustomerForm {...({currentId, setCurrentId})}/>
                </Grid>
                <Grid item xs={8} >
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Reward Points</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {                                  
                                    props.CustomerList.map((record, index) => {
                                        return( 
                                            <TableRow key={index}>
                                                <TableCell>{record.customerName}</TableCell>
                                                <TableCell>{record.customerEmail}</TableCell>
                                                <TableCell>{record.customerPhone}</TableCell>
                                                <TableCell>{record.rewardPointTotal}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button><EditIcon color="primary"
                                                            onClick={() => { setCurrentId(record.Id) }}/></Button>
                                                        <Button><DeleteIcon color="secondary"/></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )       
                                    })           
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state =>({
    CustomerList: state.Customer.list
})

const mapActionToProps = {
    fetchAllCustomers: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles) (Customers));
