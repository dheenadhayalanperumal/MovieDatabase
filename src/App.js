import React from 'react';
import Fetch from './components/Fetch';
import NavBar from './components/NavBar';
import Trend from './components/Trend';
import { Divider} from '@mui/material';
import Slider1 from './components/Slider1';




function App() {
  return (
    <div className="App">
      <NavBar />
      <Slider1 />  
    <Trend />
    <Divider />
      <Fetch />
    </div>
  );
}

export default App;
