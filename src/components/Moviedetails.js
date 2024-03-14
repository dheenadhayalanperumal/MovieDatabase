import { useEffect, useState } from "react";
import TodayTrend from "../api/TodayTrend";
import "../App.css";
import { useSelector } from "react-redux";
import banner from "../image/banner.png";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import NowPlay from "./NowPlaying";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import play from "../image/play.png";
import MovieID from "../api/MovieId";


const Moviedetails = () => {
  const [error, setError] = useState(null);
  const [trend, setTreand] = useState([]);
  const movieId = useSelector((state) => state.movieId);

  useEffect(() => {
    MovieID()
      .then((response) => {
        setTreand(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
      });
  }, []);

  return (
    <div>
      <Grid container spacing={1} color={"white"}>
      <Grid item xs={12} md={8}>
  <div style={{ position: 'relative' }}>
    <img src={banner} alt="banner" width={"100%"} height={"100%"} />
    <img 
      id="playBu1" 
      src={play} 
      alt="banner" 
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} 
    />
  </div>
</Grid>
        <Grid item xs={12} md={4}>
        <Grid container spacing={0} color={"white"}>
        <Grid item xs={6} md={12}>
          
          <div style={{ position: 'relative' }}>
    <img src={banner} alt="banner" width={"100%"} height={"100%"} />
    <img 
      id="playBu1" 
      src={play} 
      alt="banner" 
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%' }} 
    />
  </div>
          
          </Grid>
          <Grid item xs={6} md={12}>
          <div>
          <div style={{ position: 'relative' }}>
    <img src={banner} alt="banner" width={"100%"} height={"100%"} />
    <img 
      id="playBu1" 
      src={play} 
      alt="banner" 
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '10%' }} 
    />
  </div>
          </div>
          </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} color={"white"}>
        <Grid item xs={12} md={8}>
      <div>
        <div className="trailer">
          <div>
            <Typography gutterBottom variant="h5" component="div" color={'#ffffff'}>
              Lizard
            </Typography>
            <Typography variant="body2">2024| 1h 49m | Fantacy </Typography>
          </div>
          <div className="heart1">
            
          <FavoriteBorderIcon /> 
            <Typography gutterBottom variant="h7" component="div" color={'#ffffff'}>
             73.555
            </Typography>
          </div>
        </div>
      </div>
      </Grid>
      </Grid>


      
        <div className="trailer1">
          <div>
            <Typography gutterBottom variant="h6" component="div" sx={{color:'#F6C703'}}>
              Overview
            </Typography>
            <Typography variant="body2" sx={{color:'#8E8E8E', textWrap:'wrap'}}>A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.</Typography>
          </div>
        
        </div>

                <div>
                  <div>
                    <Typography gutterBottom variant="h6" component="div" sx={{color:'#FFFFFF'}}>
                    Cast & Crew
                    </Typography>
                    <div className="cast">
                    <Avatar sx={{width:80, height:80}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography variant="body2" sx={{color:'#8E8E8E', textWrap  :'wrap'}}>
                      Rabin Hood
                    </Typography> 
                  </div>
                   </div> 
                   </div>
                   <Typography gutterBottom variant="h6" component="div" sx={{color:'#FFFFFF'}}>
                    {movieId}
                    </Typography>
                   <NowPlay />

                   
                   
    </div>
  );
};

export default Moviedetails;
