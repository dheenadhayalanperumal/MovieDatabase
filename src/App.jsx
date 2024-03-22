import React from 'react';
import PopularMov from './components/PopularMov';
import Moviedetails from './components/Moviedetails';
import { Provider } from 'react-redux';
import store from './store';
import NowPlay from './components/NowPlaying';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  PopularMovAll from './components/PopularMovAll';
import NowPlayA from './components/NowplayingAll';
import TrendAll from './components/TrendAll';
import SearchRes from './components/SearchResult';
import DrawerAppBar from './components/NavBar';
import TopRateAll from './components/TopratedAll';




function App() {

  return (
    <div className="App">
      <Provider store={store}>
       
          {/* <NavBar /> */}
         <DrawerAppBar/> 
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/popular" element={<PopularMov />} />
            <Route path="/now-playing" element={<NowPlay />} />
            <Route path="/movie/:id" element={<Moviedetails />} />
            <Route path="/PopularA" element={< PopularMovAll/>} />
            <Route path='/nowplay' element={<NowPlayA />} />
            <Route path="/trend" element={<TrendAll />} />
            <Route path="/search/:query" element={< SearchRes/>} />
            <Route path="/toprated" element={<TopRateAll />} />

          </Routes> 
         
          
      
      </Provider>
    </div>
  );
}

export default App;
