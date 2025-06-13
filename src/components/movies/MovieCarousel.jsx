import React, { useRef, useState, useEffect, useCallback } from 'react';
import { getMovies } from '@/api/services/index.js';
import MovieItem from './MovieItem.jsx';
import styles from './css/MovieCarousel.module.css';
import { response, genres, getGenreName } from './contant.js';
import useScrollWidthCalculation from '@/hooks/useScrollWidthCalculation.js';
import { RiArrowLeftWideFill, RiArrowRightWideFill } from 'react-icons/ri';
import { useInView } from 'react-intersection-observer';

export default function MovieCarousel({ gender }) {
  const { ref, inView } = useInView({
    // triggerOnce: true,
    // threshold: 0.5,
    rootMargin: '1500px',
  });
  const [data, setData] = useState([]);
  const moviesContainer = useRef();
  const moviesParentContainer = useRef();
  const arrowLeft = useRef(); // Referencia para ocultar a seta da esquerda quando nao tiver mais filmes para o lado esquerdo
  const [positionScroll, setPositionScroll] = useState(0); // Estado para permitir o scroll da lista de filmes atraves dos botoes
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

  const assembleCards = (data) => {
    return data.map((item) => {
      return <MovieItem data={item} key={item.id} />;
    });
  };

  // Efeito para dar scroll quando o usuario clicar no botão
  useEffect(() => {
    if (
      !moviesContainer.current ||
      !moviesParentContainer.current ||
      !arrowLeft.current
    )
      return;
    const pixels = moviesParentContainer.current.offsetWidth;

    moviesContainer.current.scrollTo({
      behavior: 'smooth',
      left: pixels * positionScroll - 50,
    });

    if (positionScroll < 1) {
      arrowLeft.current.style.opacity = 0;
      arrowLeft.current.style.pointerEvents = 'none';
    } else {
      arrowLeft.current.style.opacity = '';
      arrowLeft.current.style.pointerEvents = '';
    }
  }, [positionScroll]);

  const handleClick = useCallback((direction) => {
    if (direction === 'right') return setPositionScroll((atual) => ++atual);

    setPositionScroll((atual) => (atual >= 1 ? --atual : 0));
  }, []);

  const movies = response.results;
  const genderName = getGenreName(gender);

  useEffect(() => {
    if (!refContent.current) return;

    setTimeout(() => {
      refContent.current.style.opacity = inView ? 1 : 0;
    }, 10);
  }, [inView]);

  return (
    <section className={styles.container} ref={ref}>
      <div
        className={styles.content}
        style={{
          display: inView ? 'flex' : 'none',
        }}
        ref={refContent}
      >
        <div className={styles.padding}>{genderName}</div>

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
