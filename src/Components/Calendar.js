import React, {useState, useEffect, useRef} from 'react';
import FullCalendar from '@fullcalendar/react'; 
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'; 
import dayjs from 'dayjs'

export default function Calendar() {

    const [trainings, setTrainings] = useState([]);


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
        
        eventContent={(params) =>  (
            <>
             <p>{params.event.timeText}</p>
            </>
          )}
      />
        </div>
    )
}