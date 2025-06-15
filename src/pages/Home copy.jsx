import React, { useCallback, useEffect, useRef, useState } from 'react';
import FilterHome from '@/components/filters/FilterHome.jsx';
import styles from './css/Home.module.css';
import { getMovies } from '@/api/services/index.js';
import { MovieCarousel, FeaturedMovie } from '@/components/movies/index.js';
import { getAllGenres } from '@/components/movies/contant';
import MovieItem from '../components/movies/MovieItem';
import { dataOneMovie } from '../constants/movies';
import useModalDetails from './useModalDetails';
import { all } from 'axios';

export default function Inicio() {
  const [allData, setAllData] = useState([]);
  const [idDataModal, setIdDataModal] = useState(null);
  const [dataModal, setDataModal] = useState();

  const stylePopup = {
    position: 'absolute',
    zIndex: 1000,
  };

  useEffect(() => {
    const data = allData.find(({ id }) => {
      console.log(id);
      return id === idDataModal;
    });

    console.log('Selecionado');
    setDataModal(data);
  }, [idDataModal]);

  useEffect(() => {
    console.log('modalRef');
    console.log(modalRef);
  }, [dataModal]);

  useEffect(() => {
    console.log(allData);
  }, [allData]);

  const containerRef = useRef();
  const modalRef = useRef();

  useModalDetails({ modalRef, containerRef, allData, setIdDataModal });

  // const exibirDetalhes = useCallback((event) => {
  //   // const { target } = event;
  //   // console.log(event.target.dataset.dataShowDetails);
  //   console.log('event');
  //   const pai = event.target.closest('[data-show-details]');
  //   if (pai) {
  //     const { left, top } = pai.getBoundingClientRect();
  //     setPositionModal((d) => ({ ...d, top: top, left: left, visible: true }));
  //     return;
  //   }

  //   setPositionModal((e) => ({ ...e, visible: false }));
  // }, []);

  return (
    <div ref={containerRef} className={`${styles.container}`}>
      <FilterHome />
      {/* <FeaturedMovie /> */}

      {/* {[...getAllGenres()].map((number) => {
        return <MovieCarousel gender={number} key={number} />;
      })} */}

      <MovieCarousel gender={getAllGenres()[0]} setAllData={setAllData} />

      <MovieItem
        data={{
          ...dataModal,
          ref: modalRef,
          witchDetails: true,
          style: stylePopup,
        }}
      />
    </div>
  );
}
