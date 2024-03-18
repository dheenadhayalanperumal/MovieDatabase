import axios from 'axios';


const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDMyOWYwZDAwNmJhMDkxZjA0MmNhN2UzNTZiZjA1OCIsInN1YiI6IjY1ZTgxMWM2Y2FhYjZkMDE0ODk1MTMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RCuG-v8xz9PI1AdyVWQui7vND93ZNs34Z3nWJ2umtDE';
const Search = async (query) => {
    const value = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return value;  
}
    export default Search;


    