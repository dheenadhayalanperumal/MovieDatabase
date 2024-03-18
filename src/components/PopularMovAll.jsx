import React, { useEffect, useState } from "react";
import Popular from "../api/Popular";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, Item } from "@mui/material";
import "../App.css";
import { CircularProgress, Box } from "@mui/material";

const PopularMovAll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleMovieClick = (id) => {
    dispatch({ type: 'SET_MOVIE_ID', payload: id });
  };

  useEffect(() => {
    setLoading(true);
    Popular()
   
      .then((response) => {
        console.log(response.data);
        setLoading(false)
        setData(response.data.results);
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred while fetching data");
      });
  }, []);
  if (loading)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  return (



    <div>
        <Grid container spacing={2} >
 {
        data.map((movie) => {
          return (
            <Grid className="Link" item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <div  key={movie.id}>
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





export default PopularMovAll;