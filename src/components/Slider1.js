import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TodayTrend from "../api/TodayTrend";
import { useEffect, useState } from "react";
import Banner from '../image/banner.png'; 




const settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   centerMode: true,
   variableWidth: true,
   swipeToSlide: true,
   edgeFriction: 0.15,
};

const Slider1 = () => {
   const [trend, setTreand] = useState([]);
   const [error, setError] = useState(null);


      useEffect(() => {
        TodayTrend()
           .then((response) => {
              setTreand(response.data);
              console.log(response.data);
           })
           .catch(() => {
              setError("An error occurred while fetching data");
           });
     }, []);

     if (error) {
        return <div>{error}</div>;
     }

return (
   <div style={{ display: "flex", justifyContent: "center" }}>
      <img src={Banner} alt="banner" width={'100%'} height={"100%"} />
   </div>
   // {/* {trend?.results?.map((movie) => (
   //    <Card className="banner" key={movie.id} component="li">
   //       <CardMedia
   //          component="img"
   //          image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
   //          alt="hello"
   //       />
   //    </Card>
   // ))} */}
   // <img src={Banner} alt="banner" />
   // </Slider>
)
}
export default Slider1;



