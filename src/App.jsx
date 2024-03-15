import React from 'react';
import PopularMov from './components/PopularMov';
import NavBar from './components/NavBar';
import Trend from './components/Trend';
import { Divider} from '@mui/material';
import Slider1 from './components/Slider1';
import Moviedetails from './components/Moviedetails';
import { Provider } from 'react-redux';
import store from './store';
import NowPlay from './components/NowPlaying';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';






function App() {

  return (
    <div className="App">
      <Provider store={store}>
       
          <NavBar />
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/popular" element={<PopularMov />} />
            <Route path="/now-playing" element={<NowPlay />} />
            <Route path="/movie/:id" element={<Moviedetails />} />
          </Routes>
         
          
      
      </Provider>
    </div>
  );
}

export default App;
