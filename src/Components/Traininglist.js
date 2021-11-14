import React, {useState, useEffect} from 'react';
import { AgGridReact} from 'ag-grid-react';
import { Snackbar } from '@mui/material';

import Button from '@mui/material/Button';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import dayjs from 'dayjs';

export default function Traininglist() {
    
    const [customertraining, setCustomertraining] = useState([]);

    useEffect(() => fetchCustomertraining(), [])

    const [open, setOpen] = React.useState(false);
    
    const[msg, setMsg] = useState('');
    
    const handleClose = () => {
        setOpen(false);
      };

    const fetchCustomertraining= () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setCustomertraining(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = url => {
        if (window.confirm('Are you sure you want to delete the training session?')) {
            fetch(url, {
                method: 'DELETE'
            })
            .then(response => {
                if(response.ok) {
                    fetchCustomertraining();
                    setMsg("Training deleted");
                    setOpen(true);
                    
                }
                else
                alert('Delete did not work!')
            })
            .catch(err => console.error(err))
        }
    }

    const columns = [
        {field: 'date', valueFormatter: (params) => {
            return dayjs(params.value).format('DD.MM.YYYY hh:mm')
        },
        sortable: true,
        filter:true
    },
    {field: 'duration', sortable: true, filter: true},
    {field: 'activity', sortable: true, filter: true},
    {
        headerName: "Customer",
        cellRendererFramework: params => params.data.customer.firstname + " " + params.data.customer.lastname
    },
    {
        headerName: '',
        sortable: false,
        filter: false,
        width: 100,

        field: 'links.self.href',
        cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}>Delete</Button>
    }
    
    ]

    
    return(
        
            <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '50%', margin: 'auto'}}>
            <AgGridReact 
                rowData={customertraining}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}>
                </AgGridReact>
                <Snackbar
             open={open}
             message={msg}
             autoHideDuration={3000}
             onClose={handleClose}
             />
        </div>
    )
}