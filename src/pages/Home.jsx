import { useEffect, useRef, useState } from 'react';
import FilterHome from '@/components/filters/FilterHome.jsx';
import styles from './css/Home.module.css';
import { MovieCarousel, FeaturedMovie } from '@/components/movies/index.js';
import { getAllGenres } from '@/components/movies/contant';
import MovieItemWithDetails from '../components/movies/MovieItemWithDetails';

export default function Inicio() {
  const [allData, setAllData] = useState([]);
  const [idDataModal, setIdDataModal] = useState(null);
  const [dataModal, setDataModal] = useState();
  const containerRef = useRef();
  const modalRef = useRef();
  const [positionModal, setPositionModal] = useState({
    left: 0,
    top: 0,
    visible: false,
  });

  useEffect(() => {
    const data = allData.find(({ id }) => {
      return id === idDataModal;
    });

    console.log(data);

    setDataModal(data);
  }, [idDataModal]);

  return (
    <div ref={containerRef} className={`${styles.container}`}>
      <FilterHome />
      {/* <FeaturedMovie /> */}

      {/* <MovieCarousel gender={getAllGenres()[0]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[1]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[3]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[4]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[5]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[6]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[7]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[8]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[9]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[10]} setAllData={setAllData} />
      <MovieCarousel gender={getAllGenres()[11]} setAllData={setAllData} /> */}

      {[...getAllGenres()].map((number) => {
        return (
          <MovieCarousel gender={number} key={number} setAllData={setAllData} />
        );
      })}

      {/* Modal com detalhes do filme. Sera exibido quando o usuario passar o mouse por cima */}
      <MovieItemWithDetails
        data={{
          ...dataModal,
          ref: modalRef,
          witchDetails: true,
          positionModal,
          dataModal,
          setPositionModal,
          modalRef,
          containerRef,
          allData,
          setIdDataModal,
        }}
      />
    </div>
  );
}
