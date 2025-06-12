import api from './useFetch.js';

// Documentação ↓
//https://developer.themoviedb.org/reference/path-path
const paths = {
  //Filmes
  getMovies: '/discover/movie',
  // Populares
  getPopular: '/movie/popular',
  // mais votados
  topRated: '/movie/top_rated',
  top10Today: '/trending/movie/day',
  top10OfTheWeek: '/trending/movie/week',
};

function getMovies(options) {
  const pathURL = paths.getMovies;
  const response = api(pathURL, options);
  return response;
}

export { getMovies };
