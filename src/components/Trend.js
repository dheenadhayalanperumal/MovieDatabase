import React from "react"; 
import { useEffect} from "react"; 


const Trend = () => {
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trend, setTreand] = useState([]);

  useEffect(() => {
    setLoading(true);
    TodayTrend()
      .then((response) => {
        setTreand(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching data");
        setLoading(false);
      });
  });
  if (loading) { 
    return <p>${error}</p>;
  }

    return (
        <div>
          
    
          <div id="Trend" className="scroll">
            {trend?.results?.map((movie) => (
              <div className="cardMovie" key={movie.id}>
                <MovieCard  data={movie} />
              </div>
            ))}
          </div>
        
        </div>
    );
};
export default Trend;