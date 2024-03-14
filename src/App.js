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





function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <NavBar />
      {/* <Slider1 />   */}
      <Moviedetails />
    {/* <Trend />
    <Divider />
    <PopularMov />
    <Divider />
      <NowPlay />
      <Divider />
      <Moviedetails /> */}
      </Provider>
       </div>
  );
}

export default App;
