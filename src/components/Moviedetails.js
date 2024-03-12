
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState} from "react";
import TodayTrend from "../api/TodayTrend";
import '../App.css';
import { useSelector } from 'react-redux';

const Moviedetails = () => {
    const [error, setError] = useState(null);
    const [trend, setTreand] = useState([]);
    const movieId = useSelector((state) => state.movieId);

    useEffect(() => {
    
        TodayTrend()
          .then((response) => {
            setTreand(response.data);
            
             console.log(response.data);
          })
          .catch((error) => {
            setError("An error occurred while fetching data");
           
          });
      },[]);

    return (
        <div>
        

            <h2>hi peopel{movieId}</h2>
        </div>
    );
    }   
    export default Moviedetails;