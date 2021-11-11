
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
          <Tabs value={page} onChange={handleChange} textColor="inherit" indicatorColor="secondary"
            aria-label="secondary tabs example">
            <Tab label="Customers" value="one" />
            <Tab label="Training" value="two" />
          </Tabs>
         
        </Toolbar>
        </AppBar>
        </Box>
        {page === "one" && <Customerlist/>}
        {page === "two" && <TrainingList />}
    </div>
  );
}

export default App;
