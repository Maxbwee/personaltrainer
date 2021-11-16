import React, {useState, useEffect, useRef} from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

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
        plugins={[ dayGridPlugin ]}
        
        timeZone="UTC"
        initialView="dayGridMonth"
        views="dayGrid"
        events={trainings}
        eventContent={(params) => {


        }
        }
      />
        </div>
    )
}