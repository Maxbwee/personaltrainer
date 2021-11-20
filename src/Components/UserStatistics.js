import React, {useState, useEffect, PureComponent} from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import _ from "lodash";


export default function UserStatistics() {



    const [trainings, setTrainings] = useState([]);
    

    useEffect(() => fetchTrainings(),[]);
    
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data.map(data => 
            ({
                trainingActivity: data.activity,
                duration: data.duration
            }))
        ))
        .catch(err => console.error(err))
        
    }


    const values = _(trainings)
        .groupBy(activity => activity.trainingActivity)
        .map((value, key) => ({
            trainingActivity: key,
            total: _.sumBy(value, 'duration')
        }))
        .value()
      
        
          return (

            <div 
            style={{maxWidth: '2000px', maxHeight: '1500px', margin: 'auto', textAlign: 'center'}}>
            <h4 style={{marginTop: '20px'}}>Duration in minutes per Training </h4>
            <ResponsiveContainer width="100%" aspect={3}>
                <BarChart                                               
                    width={500}
                    height={500}
                    data={values}
                    margin={{ top: 20, right: 80, left: 20, bottom: 20 }}
                >
                <Tooltip />
                <Legend />
                <XAxis dataKey="trainingActivity" label={{value: 'Training', position: 'insideBottomRight'}} />
                <YAxis label={{value: 'Minutes', angle: -90, position: 'insideLeft'}}/>
                <CartesianGrid strokeDasharray="3 3" />
                <Bar barSize={80}  dataKey="total" fill="#3366ff" />
                
                </BarChart>
            </ResponsiveContainer>
            </div>
          );
        }
      
