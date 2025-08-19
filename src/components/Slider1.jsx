
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TodayTrend from "../api/TodayTrend";
import { useEffect, useState } from "react";
import Banner from "../image/banner.png";
import bannercontent from "../image/bannerContent.png";
import play from "../image/play.png";
import { Typography } from "@mui/material";




const Slider1 = () => {
  const [, setTreand] = useState([]);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    TodayTrend()
      .then((response) => {
        setTreand(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setError("An error occurred while fetching data");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const handlePlay = () => {
    window.location.href = "/movie/475557";
  //  setIsPlaying(true);
 };

  return (
    <div className="SliderH">
    <div style={{ display: "flex", justifyContent: "center", color: "white" }}>
      <img src={Banner} alt="banner" width={"100%"} height={"100%"} />
      <div className="bannertext">
        <p>#1 in India</p>
        <img src={bannercontent} alt="banner" />
        <div className="play">
          <img id="playBu" onClick={handlePlay} src={play} alt="banner" />
          <Typography variant="h6" ml={1} style={{ color: "white" }}>
            Watch Trailer
          </Typography>
        </div>
      </div>
    
    </div>
    </div>
  );
};
export default Slider1;
