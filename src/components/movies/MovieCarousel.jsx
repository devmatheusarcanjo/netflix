import React, { useRef, useState, useEffect, useCallback } from 'react';
import { getMovies } from '@/api/services/index.js';
import MovieItem from './MovieItem.tsx';
import styles from './css/MovieCarousel.module.css';
import { response, genres, getGenreName } from './contant.js';
import useScrollWidthCalculation from '@/hooks/useScrollWidthCalculation.js';
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import deviceWidth from '../../constants/deviceWidth.ts';
import useDeviceDetection from '../../hooks/useDeviceDetection.ts';
import useChangeScrollOperation from '../../hooks/useChangeScrollOperation.ts';

export default function MovieCarousel({ gender, setAllData }) {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    // threshold: 0.5,
    rootMargin: '1500px',
  });

  const [data, setData] = useState([]);
  const moviesContainer = useRef();
  const moviesParentContainer = useRef();
  const arrowLeft = useRef(); // Referencia para ocultar a seta da esquerda quando nao tiver mais filmes para o lado esquerdo
  const arrowRight = useRef(); // Referencia para ocultar a seta da esquerda quando nao tiver mais filmes para o lado direito
  const [positionScroll, setPositionScroll] = useState({
    position: 0,
    blockAddition: false,
    blockRemoval: false,
  }); // Estado para permitir o scroll da lista de filmes atraves dos botoes
  const refContent = useRef(); // Referencia para aplicar no container que exibe a lista de filmes e aplicar uma animação de opacidade

  // Carregar os itens e atualizar conforme o usuario for chegando ao fim do scroll de cada container
  useScrollWidthCalculation(
    {
      // element: moviesContainer.current,
      getMovies,
      setData,
      gender,
      inView,
    },
    moviesContainer.current
  );

  useEffect(() => {
    setAllData((v) => [...v, ...data]);
  }, [data]);

  const assembleCards = (data) => {
    // return data.map((item) => {
    // return <MovieItem data={item} key={item.id} />;
    // });
    return <MovieItem data={data} key={data.id} />;
  };

  // Efeito para dar scroll quando o usuario clicar no botão
  useChangeScrollOperation({
    moviesContainer,
    moviesParentContainer,
    arrowLeft,
    positionScroll,
    setPositionScroll,
    arrowRight,
  });

  const handleClick = useCallback(
    (direction) => {
      // if (direction === 'right') return setPositionScroll((atual) => ++atual);

      // setPositionScroll((atual) => (atual >= 1 ? --atual : 0));

      if (!positionScroll.blockAddition && direction === 'right') {
        setPositionScroll((d) => ({
          ...d,
          position: d.position + 1,
        }));
      }

      if (!positionScroll.blockRemoval && direction === 'left') {
        setPositionScroll((d) => ({
          ...d,
          position: d.position >= 1 ? d.position - 1 : 0,
        }));
      }
    },
    [positionScroll]
  );

  const movies = response.results;
  const genderName = getGenreName(gender);

  useEffect(() => {
    if (!refContent.current) return;

    setTimeout(() => {
      // refContent.current.style.opacity = inView ? 1 : 0;
    }, 100);
  }, [inView]);

  return (
    <section className={styles.container} ref={ref}>
      <div
        className={styles.content}
        style={{
          // visibility: inView ? 'visible' : 'hidden',
          visibility: 'visible',
        }}
        ref={refContent}
      >
        <div className={`${styles.padding} ${styles.titleCategory}`}>
          {genderName}
        </div>

        <div
          className={styles.moviesParentContainer}
          ref={moviesParentContainer}
        >
          <div
            className={styles.arrowLeft}
            ref={arrowLeft}
            onClick={() => handleClick('left')}
          >
            <RiArrowLeftWideFill size={50} />
          </div>
          <div ref={moviesContainer} className={styles.moviesContainer}>
            {data && data.map(assembleCards)}
          </div>
          <div
            ref={arrowRight}
            className={styles.arrowRight}
            onClick={() => handleClick('right')}
          >
            <RiArrowRightWideFill size={50} />
          </div>
        </div>
      </div>
    </section>
  );
}
