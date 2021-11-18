
import React, {useState} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Customerlist from './Components/Customerlist';
import TrainingList from './Components/Traininglist';
import Addcustomer from './Components/Addcustomer';
import Calendar from './Components/Calendar';
import UserStatistics from './Components/UserStatistics';

function App() {

  const [page, setPage] = useState('one')

  const handleChange = (e, value) => {
    setPage(value)
  }
  


  return (
    <div className="App">
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personal Trainer App
            </Typography>
          <Tabs value={page} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
            <Tab label="Customers" value="one" />
            <Tab label="Training" value="two" />
            <Tab label="Calendar" value="three" />
            <Tab label="Statistics" value="four" />
          </Tabs>
         
        </Toolbar>
        </AppBar>
        </Box>
        {page === "one" && <Customerlist/>}
        {page === "two" && <TrainingList />}
        {page === "three" && <Calendar/>}
        {page === "four" && <UserStatistics/>}
    </div>
  );
}

export default App;
