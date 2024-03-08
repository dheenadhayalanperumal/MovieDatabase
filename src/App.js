import React from 'react';
import Fetch from './components/Fetch';
import NavBar from './components/NavBar';
import TodayTrend from './api/TodayTrend';

function App() {
  return (
    <div className="App">
      <NavBar />
    {/* <TodayTrend /> */}
      <Fetch />
    </div>
  );
}

export default App;
