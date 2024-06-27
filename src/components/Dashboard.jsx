import React, { useState, useEffect } from "react";
import Skeleton from '@mui/material/Skeleton';
import Slider1 from "./Slider1";
import Trend from "./Trend";
import PopularMov from "./PopularMov";
import NowPlay from "./NowPlaying";
import Box from '@mui/material/Box';
import TopRate from "./TopRate";


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const commonSkeletonStyle = { bgcolor: 'grey.200' };
const rowStyle = { display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row' };
const containerStyle = { overflowY: 'auto', height: '100vh' };
const boxStyle = { display: 'flex', justifyContent: 'center', alignItems: 'start', height: '50vh' };


  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <Box sx={boxStyle}>
          {/* <CircularProgress /> */}
          <Skeleton variant="rectangular" width="95%" height={480} sx={{ ...commonSkeletonStyle, borderRadius: '5px' }} />
        </Box>
        <Box sx={{ justifyContent: 'space-evenly', paddingTop: 2 }}>
          <Skeleton height={40} width={200} sx={commonSkeletonStyle} />
          <div style={rowStyle}>
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} width="15%" height={420} sx={commonSkeletonStyle} />
            ))}
          </div>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <Slider1 />
      <Trend />
      <NowPlay />
      <TopRate />
      <PopularMov />
    
    </div>
  );
};

export default Dashboard;