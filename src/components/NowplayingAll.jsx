import React, { useEffect, useState } from "react";
import fetchData from "../api/Apicall";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, Item } from "@mui/material";
import "../App.css";
import { CircularProgress, Box } from "@mui/material";
import { Skeleton } from "@mui/material";

const NowPlayA = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleMovieClick = (id) => {
    dispatch({ type: 'SET_MOVIE_ID', payload: id });
  };

useEffect(() => {
    setLoading(true);
    fetchData()
    
        .then((response) => {
            console.log(response.data);
            setLoading(false);
            setData(response.data.results);
        })
        .catch(() => {
            setLoading(false);
            console.log("An error occurred while fetching data");
        });
}, []);

  if (loading)
  return (
    <Grid container spacing={3}>
      {[...Array(12)].map((_, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
      ))}
    </Grid>
  );

  return (



    <div>
        <Grid container spacing={3} >




 {
        data.map((movie) => {
          return (
            <Grid className="Link" item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <div key={movie.id}>
                  <MovieCard data={movie} onClick={handleMovieClick} />
                </div>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
 }





export default NowPlayA;
