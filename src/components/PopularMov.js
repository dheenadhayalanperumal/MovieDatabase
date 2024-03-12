import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import PopularMovie from "../api/Popular";
import { Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import "../App.css";

const PopularMov = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleMovieClick = (id) => {
    dispatch({ type: 'SET_MOVIE_ID', payload: id });
  };

  useEffect(() => {
    const addEventListeners = (id) => {
      const slider = document.getElementById(id);
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener("mousedown", (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.classList.remove("active");
      });
      slider.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    };

    addEventListeners("scrollablePopular");
  }, []);

  useEffect(() => {
    PopularMovie()
      .then((response) => {
        setData(response.data);

        // console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
      });
  }, []);
  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div>
      <Typography>
        <h2 className="title"> Popular Movies </h2>
      </Typography>
      <div id="scrollablePopular" className="scroll">
        {data?.results?.map((movie) => (
          <div className="cardMovie" key={movie.id}>
            <MovieCard data={movie} onClick={handleMovieClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMov;