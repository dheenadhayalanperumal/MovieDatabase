import React, { useEffect, useState, useRef } from "react";
import fetchData from "../api/Apicall";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, Typography } from "@mui/material";
import { CircularProgress, Box } from "@mui/material";

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

const NowPlayA = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();
  const dispatch = useDispatch();

  const handleMovieClick = (id) => {
    dispatch({ type: "SET_MOVIE_ID", payload: id });
  };

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      setLoading(true);
      try {
        const response = await fetchData(page);
        setData((prevData) => [...prevData, ...response.data.results]);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndHandleLoading();
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

  return (
    <div>
      <Typography gutterBottom variant="h4" sx={{ color: "#8D8D8D", marginBottom: 2, textAlign: "center" }}>
        Now Playing Movies
      </Typography>
      <Grid container spacing={3}>
        {data.map((movie) => (
          <Grid className="Link" item xs={6} sm={4} md={3} lg={2} key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <MovieCard data={movie} onClick={handleMovieClick} />
            </Link>
          </Grid>
        ))}
        <div id="observer"></div>
      </Grid>
      {loading && <LoadingSpinner />}
    </div>
  );
};

export default NowPlayA;
