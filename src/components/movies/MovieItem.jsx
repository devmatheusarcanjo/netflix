import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './css/MovieItem.module.css';
import { pathImage } from '@/utils/createPathToTMDB.js';
import LazyLoad from 'react-lazyload';

function Esqueleto() {
  return <div className={styles.esqueleto}></div>;
}

export default function MovieItem({ data, key }) {
  const [imageLoading, setImageLoading] = useState(true);
  // Função para retornar a url absoluta de uma imagem da api do TMDB
  const urlImage = pathImage({
    filePath: data['poster_path'],
  });

  const img = useRef(undefined);

  useEffect(() => {
    if (img.current) {
      img.current.addEventListener(
        'load',
        () => {
          setImageLoading(false);
        },
        { once: true }
      );
    }
  }, [img]);

  const waitloading = useCallback(() => {
    setImageLoading(false);
  }, [imageLoading]);

  return (
    <div className={`${styles.item}`} data-item="with-hover" key={data.id}>
      <img src={urlImage} loading="lazy" ref={img} onLoad={waitloading} />
      {imageLoading ? <Esqueleto /> : null}
    </div>
  );
}
