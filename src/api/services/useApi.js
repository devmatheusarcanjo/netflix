import api from "./useFetch.js";

// Documentação ↓
//https://developer.themoviedb.org/reference/path-path
const paths = {
    getMovies: "/discover/movie",     
}

function getMovies(options) {               
    const pathURL = paths.getMovies; 
                
    const response = api(pathURL, options);        
    return response;
}

export {
    getMovies
}