import axios from 'axios';


const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDMyOWYwZDAwNmJhMDkxZjA0MmNhN2UzNTZiZjA1OCIsInN1YiI6IjY1ZTgxMWM2Y2FhYjZkMDE0ODk1MTMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RCuG-v8xz9PI1AdyVWQui7vND93ZNs34Z3nWJ2umtDE';
const TodayTrend = async () => {
    const value = await axios.get('https://api.themoviedb.org/3/trending/all/day?language=en-US', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return value;  
}
    export default TodayTrend;


    