import React from "react"; 
import TodayTrend  from "../api/TodayTrend";
import MovieCard from "./MovieCard";
import { useEffect, useState} from "react"; 
import { Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import { Link, NavLink } from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useRef } from "react";



const Trend = () => {   
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trend, setTreand] = useState([]);
    const [loading, setLoading] = useState(false);

    

    const castRef = useRef(null);
  const dispatch = useDispatch();

  const handleMovieClick = (id) => {
    dispatch({ type: 'SET_MOVIE_ID', payload: id });
  };

  

  const castscroll = (direction) => {
    if (direction === "left") {
      castRef.current.scrollLeft -= 400;
    } else {
      castRef.current.scrollLeft += 400;
    }
  };


  useEffect(() => {
    setLoading(true);
    TodayTrend()
         .then((response) => {
        setTreand(response.data);
        setLoading(false);
         console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
        setLoading(false);
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
     
        <div>
          <div className="seeall">
        <div>
      <Typography>
        <h6 className="title"> Today Trend</h6>
      </Typography>
      </div>
      <div><p>
        <NavLink to={"/trend"}>See All</NavLink> </p></div>
      </div>
        <div className="avatarS">
        <div>
              <button className="left"
                         onClick={() => castscroll("left")}><ArrowLeftIcon sx={{color:"white"}}/></button>
            </div>
          <div id="Trend" className="scroll"   ref={castRef}
              >
            {trend?.results?.map((movie) => (
              <Link to={`/movie/${movie.id}`}>
              <div className="cardMovie" key={movie.id}>
                <MovieCard  data={movie} onClick={handleMovieClick} />
              </div>
              </Link>
            ))}
          </div>
          <div>
              <button  className="left" onClick={() => castscroll("right")}><ArrowRightIcon sx={{color:"white"}}/></button>
            </div>
          </div>

          </div>



    );
};
export default Trend;