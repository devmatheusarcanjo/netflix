import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './css/MovieItem.module.css';
import { pathImage } from '@/utils/createPathToTMDB.js';
import Skeleton from '@mui/material/Skeleton';

import DetailsMovie from './detailsMovie';
import movieItemType from '../../interfaces/movieItem';
import useModalDetails from '../../pages/useModalDetails';
import useUpdateModalDetails from '../../pages/useUpdateModalDetails';

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

  // Hook pra aplicar o hover na pagina e obter a posição do card que o usuario passar o mouse
  // useModalDetails({
  //   modalRef,
  //   containerRef,
  //   allData,
  //   setIdDataModal,
  //   positionModal,
  //   setPositionModal,
  // });

  // Hook pra aplicar o hover na pagina e obter a posição do card que o usuario passar o mouse
  useModalDetails(data);

  useUpdateModalDetails(data);

  return (
    <div
      className={`${styles.item} ${styles.itemModal}`}
      data-show-details="modal"
      data-id={data.id}
      key={data.id}
      ref={data.ref || undefined}
      style={{ position: 'fixed' }}
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
