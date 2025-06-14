import React, { useCallback, useEffect, useRef, useState } from 'react';
import FilterHome from '@/components/filters/FilterHome.jsx';
import styles from './css/Home.module.css';
import { getMovies } from '@/api/services/index.js';
import { MovieCarousel, FeaturedMovie } from '@/components/movies/index.js';
import { getAllGenres } from '@/components/movies/contant';
import MovieItem from '../components/movies/MovieItem';
import { dataOneMovie } from '../constants/movies';

export default function Inicio() {
  const [positionModal, setPositionModal] = useState({
    left: 0,
    top: 0,
    visible: false,
  });

  const modalRef = useRef();

  useEffect(() => {
    if (!modalRef.current) return;

    const modal = modalRef.current;
    modal.style.position = 'absolute';
    modal.style.visibility = positionModal.visible ? 'visible' : 'hidden';
    modal.style.top = positionModal.top + 'px';
    modal.style.left = positionModal.left + 'px';

    console.log(modal);
  }, [positionModal]);

  const exibirDetalhes = useCallback((event) => {
    const { target } = event;
    // console.log(event.target.dataset.dataShowDetails);
    console.log(event._reactName);
    const pai = event.target.closest('[data-show-details]');
    if (pai) {
      const { left, top } = pai.getBoundingClientRect();
      setPositionModal((d) => ({ ...d, top: top, left: left, visible: true }));
      return;
    }

    setPositionModal((e) => ({ ...e, visible: false }));
  });

  return (
    <div
      className={`${styles.container}`}
      onMouseEnter={(e) => exibirDetalhes(e)}
      onMouseOut={(e) => exibirDetalhes(e)}
    >
      <FilterHome />
      {/* <FeaturedMovie /> */}

      {/* {[...getAllGenres()].map((number) => {
        return <MovieCarousel gender={number} key={number} />;
      })} */}

      <MovieCarousel gender={getAllGenres()[0]} />

      <MovieItem
        data={{ ...dataOneMovie, ref: modalRef, witchDetails: true }}
      />
    </div>
  );
}
