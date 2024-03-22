import React, { useEffect, useState, useRef } from "react";
import Toprate from "../api/Toprate";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";

const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

const TopRateAll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const observer = useRef();
  const dispatch = useDispatch();

  const handleMovieClick = (id) => {
    dispatch({ type: "SET_MOVIE_ID", payload: id });
  };

  useEffect(() => {
    setLoading(true);
    setError(null); // Reset error state
    Toprate(page)
      .then((response) => {
        setData((prevData) => [...prevData, ...response.data.results]);
      })
      .catch(() => {
        setError("An error occurred while fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (observer.current) {
      observer.current.observe(document.getElementById("observer"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (loading && !data.length) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Typography variant="h4" sx={{ color: "#8D8D8D", marginBottom: 2, textAlign: "center" }}>
        Now Playing Movies
      </Typography>
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
      {error && <p>An error occurred: {error}</p>}
      {loading && data.length > 0 && <LoadingSpinner />}
    </div>
  );
};

export default TopRateAll;
