import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid' 


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
        <div>
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
           
            // Defines the parameters that show up in the calendar activity + firstname + lastname. Documentation https://fullcalendar.io/docs
           <div>
             <p>{params.event._def.extendedProps.activity} training with {params.event._def.extendedProps.customer.firstname} {params.event._def.extendedProps.customer.lastname}</p>
            </div>
          )}
      />
        </div>
    )
}