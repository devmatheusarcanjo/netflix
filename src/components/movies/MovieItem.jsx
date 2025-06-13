import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './css/MovieItem.module.css';
import { pathImage } from '@/utils/createPathToTMDB.js';
import Skeleton from '@mui/material/Skeleton';

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

  const waitloading = useCallback(() => {
    // Quando a imagem estiver na referencia e quando ela carregar, ira executar, mas só vai marcar como carregada apos realmente for carregada
    if (img.current && !imageLoading) return;
    setImageLoading(false);
    img.current.style.opacity = 1;
  }, [imageLoading, img]);

  return (
    <div className={`${styles.item}`} data-item="with-hover" key={data.id}>
      <img src={urlImage} loading="lazy" ref={img} onLoad={waitloading} />
      {imageLoading && (
        <Skeleton
          variant="rectangular"
          animation="pulse"
          width={150}
          height={220}
        />
      )}
    </div>
  );
}
