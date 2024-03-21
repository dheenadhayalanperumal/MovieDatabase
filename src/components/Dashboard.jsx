import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Slider1 from "./Slider1";
import Trend from "./Trend";
import PopularMov from "./PopularMov";
import NowPlay from "./NowPlaying";
import Box from '@mui/material/Box';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
  }

  return (
    <div>
      <Slider1 />
      <Trend />
      <NowPlay />
      <PopularMov />
    </div>
  );
};

export default Dashboard;