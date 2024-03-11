import React from "react"; 
import TodayTrend  from "../api/TodayTrend";
import MovieCard from "./MovieCard";
import { useEffect, useState} from "react"; 
import { Typography } from "@mui/material";

const Trend = () => {
    
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trend, setTreand] = useState([]);

  useEffect(() => {
    
    TodayTrend()
      .then((response) => {
        setTreand(response.data);
        
         console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
       
      });
  },[]);

  useEffect(() => {
    const addEventListeners = (id) => {
        const slider = document.getElementById(id);
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    };

    addEventListeners('Trend');
   
}, []);

  if (error) { 
    return <p>${error}</p>;
  }

    return (
        // <div>
          
    
        //   <div id="Trend" className="scroll">
        //     {trend?.results?.map((movie) => (
        //       <div className="cardMovie" key={movie.id}>
        //         <MovieCard  data={movie} />
        //       </div>
        //     ))}
        //   </div>
        
        // </div>
        <div>
        <Typography>
        <h2 className="title"> Today Trend </h2>
      </Typography>
          <div id="Trend" className="scroll">
            {trend?.results?.map((movie) => (
              <div className="cardMovie" key={movie.id}>
                <MovieCard  data={movie} />
              </div>
            ))}
          </div>
        </div>



    );
};
export default Trend;