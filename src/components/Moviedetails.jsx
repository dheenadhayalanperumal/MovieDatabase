import { useEffect, useState } from "react";
import "../App.css";
import { Typography, Skeleton, Box } from "@mui/material";
import { Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import StarIcon from '@mui/icons-material/Star';
import MovieID from "../api/MovieId";
import Video from "../api/Videos";
import {useParams} from "react-router-dom";
import Credit from "../api/Credit";

// Skeleton components for loading states
const VideoSkeleton = () => (
  <Box sx={{ position: 'relative', paddingBottom: '56.25%', bgcolor: '#2A2A2B', borderRadius: 1 }}>
    <Skeleton
      variant="rectangular"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: '#3A3A3B',
        borderRadius: 1
      }}
      animation="wave"
    />
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      <Skeleton variant="circular" width={60} height={60} sx={{ bgcolor: '#4A4A4B' }} animation="wave" />
    </Box>
  </Box>
);

const MovieInfoSkeleton = () => (
  <div className="trailer">
    <div style={{ flex: 1 }}>
      <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: '#3A3A3B' }} animation="wave" />
      <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: '#3A3A3B', mt: 1 }} animation="wave" />
    </div>
    <div className="heart1">
      <Skeleton variant="circular" width={24} height={24} sx={{ bgcolor: '#3A3A3B' }} animation="wave" />
      <Skeleton variant="text" width={40} height={24} sx={{ bgcolor: '#3A3A3B', ml: 1 }} animation="wave" />
    </div>
  </div>
);

const OverviewSkeleton = () => (
  <div className="movieTr">
    <Skeleton variant="text" width={100} height={28} sx={{ bgcolor: '#3A3A3B' }} animation="wave" />
    <Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: '#3A3A3B', mt: 2 }} animation="wave" />
    <Skeleton variant="text" width="100%" height={20} sx={{ bgcolor: '#3A3A3B', mt: 1 }} animation="wave" />
    <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: '#3A3A3B', mt: 1 }} animation="wave" />
    <Skeleton variant="text" width="60%" height={20} sx={{ bgcolor: '#3A3A3B', mt: 1 }} animation="wave" />
  </div>
);

const CastSkeleton = () => (
  <div id="castscroll" className="cast">
    {[...Array(8)].map((_, index) => (
      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
        <Skeleton variant="circular" width={80} height={80} sx={{ bgcolor: '#3A3A3B' }} animation="wave" />
        <Skeleton variant="text" width={70} height={20} sx={{ bgcolor: '#3A3A3B', mt: 1 }} animation="wave" />
      </div>
    ))}
  </div>
);




const Moviedetails = () => {
  const [, setError] = useState(null);
  const [trend, setTrend] = useState(null);
  const [video, setVideo] = useState(null);
  const [credit, setCredit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const slider = document.getElementById("castscroll");
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const start = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const end = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const move = (e) => {
      if (!isDown) return;
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3;
      slider.scrollLeft = scrollLeft - walk;
    };

    const touchStart = (e) => start(e.touches[0]);
    const touchMove = (e) => move(e.touches[0]);

    slider.addEventListener("mousedown", start);
    slider.addEventListener("mouseleave", end);
    slider.addEventListener("mouseup", end);
    slider.addEventListener("mousemove", move);
    slider.addEventListener("touchstart", touchStart);
    slider.addEventListener("touchend", end);
    slider.addEventListener("touchmove", touchMove);

    return () => {
      slider.removeEventListener("mousedown", start);
      slider.removeEventListener("mouseleave", end);
      slider.removeEventListener("mouseup", end);
      slider.removeEventListener("mousemove", move);
      slider.removeEventListener("touchstart", touchStart);
      slider.removeEventListener("touchend", end);
      slider.removeEventListener("touchmove", touchMove);
    };
  }, []);


  useEffect(() => {
    setLoading(true);
    setTrend(null);
    setVideo(null);
    setCredit(null);

    Promise.all([
      MovieID(id),
      Video(id),
      Credit(id)
    ])
      .then(([movieRes, videoRes, creditRes]) => {
        setTrend(movieRes.data);
        setVideo(videoRes.data);
        setCredit(creditRes.data);
      })
      .catch(() => {
        setError("An error occurred while fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);


  const isVideoLoading = loading || !video?.results;
  const isMovieLoading = loading || !trend;
  const isCastLoading = loading || !credit?.cast;

  return (
    <div>
      {/* Video Section */}
      <Grid container spacing={1} color={"white"}>
        <Grid item xs={12} md={8}>
          {isVideoLoading ? (
            <VideoSkeleton />
          ) : (
            <div style={{ position: 'relative', height: '0', paddingBottom: '56.25%' }}>
              <iframe
                style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${video.results.length > 0 ? video.results[0].key : ''}`}
                title={`${trend?.title || 'Movie'} - Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={0} color={"white"}>
            <Grid item xs={6} md={12}>
              {isVideoLoading ? (
                <VideoSkeleton />
              ) : (
                <div style={{ position: 'relative', height: '0', paddingBottom: '56.25%' }}>
                  <iframe
                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${video.results.length > 1 ? video.results[1].key : ''}`}
                    title={`${trend?.title || 'Movie'} - Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </Grid>
            <Grid item xs={6} md={12}>
              {isVideoLoading ? (
                <VideoSkeleton />
              ) : (
                <div style={{ position: 'relative', height: '0', paddingBottom: '56.25%' }}>
                  <iframe
                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${video.results.length > 2 ? video.results[2].key : ''}`}
                    title={`${trend?.title || 'Movie'} - Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Movie Info Section */}
      <Grid container spacing={1} color={"white"}>
        <Grid item xs={12} md={8}>
          <div>
            {isMovieLoading ? (
              <MovieInfoSkeleton />
            ) : (
              <div className="trailer">
                <div>
                  <Typography gutterBottom variant="h5" component="div" color={'#ffffff'}>
                    {trend.title}
                  </Typography>
                  <Typography variant="body2">
                    {trend.release_date} | {trend.runtime}m | {trend.genres && trend.genres.length > 0 ? trend.genres.map((genre) => genre.name).join(', ') : 'No genres'}
                  </Typography>
                </div>
                <div className="heart1">
                  <StarIcon aria-hidden="true" sx={{ color: '#F6C703' }} />
                  <Typography gutterBottom variant="subtitle1" component="span" color={'#ffffff'} aria-label={`Rating: ${trend.vote_average} out of 10`}>
                    {trend.vote_average?.toFixed(1)}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>

      {/* Overview Section */}
      <Grid container spacing={1} color={"white"}>
        <Grid item xs={12} md={8}>
          <div>
            {isMovieLoading ? (
              <OverviewSkeleton />
            ) : (
              <div className="movieTr">
                <Typography gutterBottom variant="subtitle1" component="div" color={'#F6C703'}>
                  Overview
                </Typography>
                <Typography gutterBottom variant="body1" component="div" color={'#8E8E8E'}>
                  {trend.overview}
                </Typography>
              </div>
            )}
          </div>
        </Grid>
      </Grid>

      {/* Cast Section */}
      <div>
        <div>
          <Typography gutterBottom variant="h6" component="div" sx={{ color: '#FFFFFF' }}>
            Cast & Crew
          </Typography>
          {isCastLoading ? (
            <CastSkeleton />
          ) : (
            <div id="castscroll" className="cast">
              {credit.cast.map((cast) => (
                <div key={cast.id}>
                  <Avatar sx={{ width: 80, height: 80 }} alt={cast.name} src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} />
                  <Typography variant="body2" sx={{ color: '#8E8E8E', textWrap: 'wrap', textAlign: 'center' }}>
                    {cast.name}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Moviedetails;