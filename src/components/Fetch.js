import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Stack } from "@mui/material";
import fetchData from "../api/Apicall";
import CircularProgress from "@mui/material/CircularProgress";
import PopularMovie from "../api/Popular";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import "../App.css";

const Fetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData()
        .then((response) => {
            setData(response.data);
            setLoading(false);
        })
        .catch((error) => {
            setError("An error occurred while fetching data");
            setLoading(false);
        });
}, []);

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

    addEventListeners('scrollableNowPlaying');
    addEventListeners('scrollablePopular');
}, []);



  useEffect(() => {
    PopularMovie()
      .then((response) => {
        setPopular(response.data);

        // console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
      });
  }, []);
  // if (loading) {
  //     return (
  //         <div className='loading'>
  //             <CircularProgress size={75}/>
  //         </div>
  //     );
  // }
  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div>
      <Stack direction="column">
        <div>
        <Typography>
        <h2 className="title"> Now Playing Movies</h2>
      </Typography>
         
          <div id="scrollableNowPlaying" className="scroll">
            {data?.results?.map((movie) => (
              <div className="cardMovie" key={movie.id}>
                <MovieCard  data={movie} />
              </div>
            ))}
          </div>
        </div>

        <Divider />

        <div>
        <Typography>
        <h2 className="title"> Popular Movies </h2>
      </Typography>
          <div id="scrollablePopular" className="scroll">
            {popular?.results?.map((movie) => (
              <div className="cardMovie" key={movie.id}>
                <MovieCard  data={movie} />
              </div>
            ))}
          </div>
        </div>

       
        
      </Stack>
    </div>
  );
};

export default Fetch;
