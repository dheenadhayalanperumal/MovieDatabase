import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import PopularMovie from "../api/Popular";
import "../App.css";
import { Link, NavLink } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useRef } from "react";
import { Box } from "@mui/material";

const PopularMov = () => {
  const [, setSlidesToShow] = useState(6);

  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const castRef = useRef(null);

  const handleMovieClick = (id) => {
    dispatch({ type: "SET_MOVIE_ID", payload: id });
  };

  const castscroll = (direction) => {
    if (direction === "left") {
      castRef.current.scrollLeft -= 400;
    } else {
      castRef.current.scrollLeft += 400;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(Math.floor(window.innerWidth / 192)); // 200 is approx width of a slide
    };

    window.addEventListener("resize", handleResize);

    handleResize(); // Call the function initially to set the state based on the initial window size

    return () => window.removeEventListener("resize", handleResize); // Clean up the event listener on unmount
  }, []);

  useEffect(() => {
    PopularMovie(1)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(
          "An error occurred while fetching data using Jio Network. Please try again later."
        );
      });
  }, []);

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

    addEventListeners("scrollableNowPlaying1");
  }, []);

  if (error) {
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           
          }}
        >
          <Typography variant="h5" component="h2">
            {error}
          </Typography>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <div className="seeall">
        <div>
          <Typography>
            <h6 className="title"> Popular Movies</h6>
          </Typography>
        </div>
        <div>
          <p>
            <NavLink to={"/PopularA"}> See All</NavLink>
          </p>
        </div>
      </div>
      <div className="avatarS">
        {window.innerWidth > 600 && (
          <div>
            <button className="left" onClick={() => castscroll("left")}>
              <ArrowLeftIcon sx={{ color: "white" }} />
            </button>
          </div>
        )}

        <div id="scrollableNowPlaying1" className="scroll" ref={castRef}>
          {data?.results?.map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <div key={movie.id}>
                <MovieCard data={movie} onClick={handleMovieClick} />
              </div>
            </Link>
          ))}
        </div>
        {window.innerWidth > 600 && (
          <div>
            <button className="left" onClick={() => castscroll("right")}>
              <ArrowRightIcon sx={{ color: "white" }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularMov;
