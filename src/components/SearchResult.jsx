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
        setLoading(false);
        setData(response.data.results);
      })
      .catch(() => {
        setLoading(false);
        setData([]);
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
      {data.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
            No results found for "{query}"
          </Typography>
          <Typography sx={{ color: '#8D8D8D' }}>
            Try different keywords or check spelling
          </Typography>
        </Box>
      ) : (
        <>
          <Typography sx={{ color: 'white', mb: 2 }}>
            Search Results for "{query}" ({data.length} movies found)
          </Typography>
          <Grid container spacing={2}>
            {data.map((movie) => (
              <Grid className="Link" item xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <MovieCard data={movie} onClick={handleMovieClick} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
 }





export default SearchRes;
