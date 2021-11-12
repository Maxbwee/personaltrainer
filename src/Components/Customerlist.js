import React, {useState, useEffect, useRef} from 'react';

import { AgGridReact} from 'ag-grid-react';
import { Snackbar } from '@mui/material';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';

import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';


export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    
    const [open, setOpen] = React.useState(false);
    const[msg, setMsg] = useState('');
    
    
    const gridRef = useRef();

    const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => fetchCustomers(), [])
    
    const editingBegins = () => {
        setCustomers(gridRef.current.getSelectedNodes()[0].data)
    }

    const fetchCustomers = () => {
        console.log(customers)
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }
   
   
    const deleteCustomer = url => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE'})
            .then(response => {
                if (response.ok){
                    fetchCustomers();
                    setMsg("Customer Deleted");
                    setOpen(true);
                }
                else
                alert('Delete did not work')
            })
            .catch(err => console.error(err))
        }
    }


    const addCustomer = newCustomer => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(newCustomer)
        }
        )
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }

    const editCustomer = (url, updateCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(updateCustomer)
        })
        .then(() => fetchCustomers())
        .then(_ => { 
            setMsg("Customer updated");
            setOpen(true);
            })
       .catch(err => console.error(err))
    }

    
    const columns = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: '',
            sortalbe:false,
            filter: false,
            width: 120,
            field: 'links.self.href',
            cellRendererFramework: params => <Editcustomer editCustomer={editCustomer} customer={params}/>
        },
        {
            headerName: '',
            sortable: false,
            filter: false,
            width: 100,

            field: 'links.self.href',
            cellRendererFramework: params => <Button size="small" color="error" onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>
        }

    ]

    
    return(
        <div>
            <Addcustomer addCustomer={addCustomer}/>
        <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '90%', margin: 'auto'}}>
            <AgGridReact 
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
                rowSelection="single"
                onCellEditingStarted={editingBegins}
                onCellEditingStopped={editCustomer}>
                </AgGridReact>
      </div>
      <Snackbar
             open={open}
             message={msg}
             autoHideDuration={3000}
             onClose={handleClose}
             />
      </div>
    );
}