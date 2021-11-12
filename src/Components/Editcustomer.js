import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Editcustomer(props) {


    const [open, setOpen] = React.useState(false);

    const [customer, setCustomer] = React.useState({
       
        firstname: '',
        lastname: '',
        streetaddress:'',
        postcode: '',
        city: '',
        email: '',
        phone:''
    
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.customer.data.firstname,
            lastname: props.customer.data.lastname,
            streetaddress: props.customer.data.streetaddress,
            postcode: props.customer.data.postcode,
            city: props.customer.data.city,
            email: props.customer.data.email,
            phone: props.customer.data.phone,
        })  
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.editCustomer(props.customer.value, customer);
        handleClose();
    }

    const inputChanged = e => {
        setCustomer({...customer, [e.target.name]:e.target.value })
    }

    return(
        <div>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                            <TextField
                            margin="dense"
                             name="firstname"
                            value={customer.firstname}
                            onChange={inputChanged}
                            label="First Name"
                            fullWidth
                            variant="standard"
                            />
                            <TextField
                            margin="dense"
                            name="lastname"
                            value={customer.lastname}
                            onChange={inputChanged}
                            label="Last Name"
                            fullWidth
                            variant="standard"
                            />
                             <TextField
                            margin="dense"
                            name="streetaddress"
                            value={customer.streetaddress}
                            onChange={inputChanged}
                            label="Street Address"
                            fullWidth
                            variant="standard"
                            />
                             <TextField
                            margin="dense"
                            name="postcode"
                            value={customer.postcode}
                            onChange={inputChanged}
                            label="Postcode"
                            fullWidth
                            variant="standard"
                            />
                             <TextField
                            margin="dense"
                            name="city"
                            value={customer.city}
                            onChange={inputChanged}
                            label="City"
                            fullWidth
                            variant="standard"
                            />
                             <TextField
                            margin="dense"
                            name="email"
                            value={customer.email}
                            onChange={inputChanged}
                            label="Email"
                            fullWidth
                            variant="standard"
                            />
                             <TextField
                            margin="dense"
                            name="phone"
                            value={customer.phone}
                            onChange={inputChanged}
                            label="Phone Number"
                            fullWidth
                            variant="standard"
                            /> 
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                 <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}