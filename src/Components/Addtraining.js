import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';


export default function Addtraining(props) {
   

    const [open, setOpen] = React.useState(false);
    const [customer] = useState(props.customer)
    const [training, setTraining] = React.useState({customer: customer.links[0].href})

   const handleClickOpen = () => {
    setOpen(true);
};

    const handleClose = () => {
    setOpen(false);
}

    const handleSave = () => {
        
    props.addTraining(training)
    handleClose();

}


const inputChanged = (e) => {
    setTraining({...training, [e.target.id]:e.target.value })
}
    return(
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
            New Training
            </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add training to {customer.firstname} {customer.lastname}</DialogTitle>
            <DialogContent>
                    <TextField
                    margin="dense"
                    id="date"
                    type="datetime-local"
                    onChange={inputChanged}
                    label="Date"
                    fullWidth
                    variant="standard"
                    />
                     <TextField
                    margin="dense"
                    id="duration"
                    onChange={inputChanged}
                    label="Duration"
                    type="text"
                    fullWidth
                    variant="standard"
                    />
                     <TextField
                    margin="dense"
                    id="activity"
                    onChange={inputChanged}
                    label="Activity"
                    type="text"
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