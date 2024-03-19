import { useEffect, useState } from "react";
import TodayTrend from "../api/TodayTrend";
import "../App.css";
import { useSelector } from "react-redux";
import banner from "../image/banner.png";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import NowPlay from "./NowPlaying";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import play from "../image/play.png";
import MovieID from "../api/MovieId";
import Video from "../api/Videos";
import { useParams } from "react-router-dom";
import Credit from "../api/Credit";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import React, { useRef } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';



const Moviedetails = () => {
  const [error, setError] = useState(null);
  const [trend, setTreand] = useState([]);
  const movieId = useSelector((state) => state.movieId);
  const [video, setVideo] = useState([]);
  const [credit, setCredit] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const castRef = useRef(null);

  const castscroll = (direction) => {
    if (direction === "left") {
      castRef.current.scrollLeft -= 400;
    } else {
      castRef.current.scrollLeft += 400;
    }
  };

  // useEffect(() => {
  //   const addEventListeners = (id) => {
  //     const slider = document.getElementById(id);
  //     let isDown = false;
  //     let startX;
  //     let scrollLeft;

  //     slider.addEventListener("mousedown", (e) => {
  //       isDown = true;
  //       slider.classList.add("active");
  //       startX = e.pageX - slider.offsetLeft;
  //       scrollLeft = slider.scrollLeft;
  //     });
  //     slider.addEventListener("mouseleave", () => {
  //       isDown = false;
  //       slider.classList.remove("active");
  //     });
  //     slider.addEventListener("mouseup", () => {
  //       isDown = false;
  //       slider.classList.remove("active");
  //     });
  //     slider.addEventListener("mousemove", (e) => {
  //       if (!isDown) return;
  //       e.preventDefault();
  //       const x = e.pageX - slider.offsetLeft;
  //       const walk = (x - startX) * 3; //scroll-fast
  //       slider.scrollLeft = scrollLeft - walk;
  //     });
  //   };

  //   addEventListeners("castscroll");
  // }, []);

  useEffect(() => {
    MovieID(id)
      .then((response) => {
        setTreand(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    Video(id)
      .then((response) => {
        setVideo(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    Credit(id)
      .then((response) => {
        setCredit(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
      });
  }, []);

  if (loading)
    return (
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

  return (
    <div>
      {/* <Typography variant="h6" component="div" sx={{ color: '#FFFFFF' }}>
        {movieId}
      </Typography> */}
      <Grid container spacing={1} color={"white"}>
        <Grid item xs={12} md={8}>
          <div
            style={{
              position: "relative",
              height: "0",
              paddingBottom: "56.25%",
            }}
          >
            <iframe
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
              src={`https://www.youtube.com/embed/${
                video.results && video.results.length > 0
                  ? video.results[0].key
                  : ""
              }`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={0} color={"white"}>
            <Grid item xs={6} md={12}>
              <div
                style={{
                  position: "relative",
                  height: "0",
                  paddingBottom: "56.25%",
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                  src={`https://www.youtube.com/embed/${
                    video.results && video.results.length > 1
                      ? video.results[1].key
                      : ""
                  }`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </Grid>
            <Grid item xs={6} md={12}>
              <div
                style={{
                  position: "relative",
                  height: "0",
                  paddingBottom: "56.25%",
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                  src={`https://www.youtube.com/embed/${
                    video.results && video.results.length > 2
                      ? video.results[2].key
                      : ""
                  }`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1} color={"white"}>
        <Grid item xs={12} md={8}>
          <div>
            <div className="trailer">
              <div>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color={"#ffffff"}
                >
                  {trend.title}
                </Typography>
                <Typography variant="body2">
                  {" "}
                  {trend.release_date} | {trend.runtime}m |{" "}
                  {trend.genres && trend.genres.length > 0
                    ? trend.genres.map((genre) => genre.name).join(", ")
                    : "No genres"}
                </Typography>
              </div>
              <div className="heart1">
                <FavoriteBorderIcon />
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  color={"#ffffff"}
                >
                  {trend.vote_average}
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={1} color={"white"}>
        <Grid item xs={12} md={8}>
          <div>
            <div className="movieTr">
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                color={"#F6C703"}
              >
                Overview
              </Typography>

              <Typography
                gutterBottom
                variant="body"
                component="div"
                color={"#8E8E8E"}
              >
                {trend.overview}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>

      <div>
        <div>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ color: "#FFFFFF" }}
          >
            Cast & Crew
          </Typography>

          <div className="avatarS">
            <div>
              <button className="left"
                         onClick={() => castscroll("left")}><ArrowLeftIcon sx={{color:"white"}}/></button>
            </div>
            <div
             
              className="cast"
              ref={castRef}
              style={{
                overflow: "none",
                whiteSpace: "nowrap",
                scrollBehavior: "smooth",
              }}
            >
              {credit &&
                credit.cast &&
                credit.cast.map((cast) => (
                  <div key={cast.id}>
                    <Avatar
                      sx={{ width: 80, height: 80 }}
                      alt="Remy Sharp"
                      src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#8E8E8E",
                        textWrap: "wrap",
                        textAlign: "center",
                      }}
                    >
                      {cast.name}
                    </Typography>
                  </div>
                ))}
            </div>
            <div>
              <button  className="left" onClick={() => castscroll("right")}><ArrowRightIcon sx={{color:"white"}}/></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moviedetails;





