import React, { useEffect, useRef } from 'react';
import FilterHome from '@/components/filters/FilterHome.jsx';
import styles from './css/Home.module.css';
import { getMovies } from '@/api/services/index.js';
import { MovieCarousel, FeaturedMovie } from '@/components/movies/index.js';
import { getAllGenres } from '@/components/movies/contant';

const allGenres = getAllGenres();

export default function Inicio() {
  /* useRef utilizado para aplicar o efeito de hover nos cards de filmes */

  /* hook personalizado pra aplicar o efeito de hover cresecente nos cards */

  return (
    <div className={`${styles.container}`}>
      <FilterHome />
      {/* <FeaturedMovie /> */}

      {[...allGenres].map((number, index) => {
        return <MovieCarousel gender={number} key={number} />;
      })}

      {/* <MovieCarousel gender={allGenres[0]} /> */}
    </div>
  );
}
