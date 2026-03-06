import React, { useEffect, useState, useRef } from "react";
import Popular from "../api/Popular";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";

const PopularMovAll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [page, setPage] = useState(1);
  const observer = useRef();

  const dispatch = useDispatch();

  const handleMovieClick = (id) => {
    dispatch({ type: "SET_MOVIE_ID", payload: id });
  };

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const response = await Popular(page);
        setData((prevData) => [...prevData, ...response.data.results]);
      } catch {
        // Error handled silently
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndUpdateState();
  }, [page]);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    const observerElement = document.getElementById("observer");
    if (observerElement) {
      observer.current.observe(observerElement);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ color: "#8D8D8D", marginBottom: 2, textAlign: "center" }}>Popular Movies</Typography>
      <Grid container spacing={2}>
        {data.map((movie) => (
          <Grid className="Link" item xs={6} sm={4} md={3} lg={2} key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <MovieCard data={movie} onClick={handleMovieClick} />
            </Link>
          </Grid>
        ))}
        <div id="observer"></div>
      </Grid>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default PopularMovAll;
