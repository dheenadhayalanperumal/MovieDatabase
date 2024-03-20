import React, { useEffect, useState } from "react";
import Search from "../api/Search";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid, Typography} from "@mui/material";
import "../App.css";
import { CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";

const SearchRes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
//   const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleMovieClick = (id) => {
    dispatch({ type: 'SET_MOVIE_ID', payload: id });
  };

  useEffect(() => {
    setLoading(true);
   Search(query)   
      .then((response) => {
        console.log(response.data);
        setLoading(false)
        setData(response.data.results);
      })
      .catch((error) => {
        setLoading(false);
        console.log("An error occurred while fetching data");
      });
  }, [query]);


  if (loading)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

 


  return (
    <div>
      <Typography sx={{color:'white'}}>There is no movie available</Typography>
            {data.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography sx={{color:'white'}}>Search Results of {query}</Typography>
        
        </Box>
      ) : (
        
        <Grid container spacing={2}>
         {data.map((movie) => (
            <Grid className="Link" item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <div key={movie.id}>
                  <MovieCard data={movie} onClick={handleMovieClick} />
                </div>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
 }





export default SearchRes;
