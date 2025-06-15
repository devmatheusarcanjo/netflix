import React, { useCallback, useRef, useState } from 'react';
import styles from './css/MovieItem.module.css';
import { pathImage } from '@/utils/createPathToTMDB.js';
import Skeleton from '@mui/material/Skeleton';
import DetailsMovie from './detailsMovie';

export default function MovieItem({ data }) {
  const [imageLoading, setImageLoading] = useState(true);
  // Função para retornar a url absoluta de uma imagem da api do TMDB
  const urlImage = pathImage({
    filePath: data['poster_path'],
  });

  const imgRef = useRef<HTMLInputElement | undefined>(undefined);

  const waitloading = useCallback(() => {
    // Quando a imagem estiver na referencia e quando ela carregar, ira executar, mas só vai marcar como carregada apos realmente for carregada
    // if (img.current && !imageLoading) return;
    if (!imageLoading) setImageLoading(false);
    if (imgRef.current) {
      imgRef.current.style.opacity = '1!important';
    }
  }, [imageLoading, imgRef]);

  return (
    <div
      className={`${styles.item}`}
      data-item="with-hover"
      data-show-details={data.style ? 'modal' : 'slide-item'}
      data-id={data.id}
      key={data.id}
      ref={data.ref || undefined}
      style={data.style || {}}
    >
      <div className={styles.containerImg}>
        <img ref={imgRef} src={urlImage} loading="eager" onLoad={waitloading} />
      </div>
      {data.witchDetails && <DetailsMovie data={data} />}

      {!imageLoading && (
        <div className={styles.esqueleto}>
          <Skeleton
            variant="rectangular"
            animation="pulse"
            width={150}
            height={220}
          />
        </div>
      )}
    </div>
  );
}
