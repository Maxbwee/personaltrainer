import React, {useState, useEffect} from 'react';
import { AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import dayjs from 'dayjs';

export default function Traininglist() {
    
    const [customertraining, setCustomertraining] = useState([]);

    useEffect(() => fetchCustomertraining(), [])

    const fetchCustomertraining= () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setCustomertraining(data))
        .catch(err => console.error(err))
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

    
    ]

    
    return(
        
            <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '45%', margin: 'auto'}}>
            <AgGridReact 
                rowData={customertraining}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}>
                </AgGridReact>
        </div>
    )
}