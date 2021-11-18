import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid' 
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Calendar() {

    const [trainings, setTrainings] = useState([]);


    
    useEffect(() => fetchTrainings(),[])

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    
    
    return(
      <div className="ag-theme-material" style={{marginTop: 20, height: 300, width: '95%', margin: 'auto'}}>
             <FullCalendar
        
         plugins={[dayGridPlugin, timeGridPlugin]}
         headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
        initialView="dayGridMonth"
        editable
        events={trainings}
        eventContent={(params) =>  (
           
           <div>
             <p>{params.event._def.extendedProps.activity} training with {params.event._def.extendedProps.customer.firstname} {params.event._def.extendedProps.customer.lastname}</p>
            </div>
          )}
      />
        </div>
    )
}