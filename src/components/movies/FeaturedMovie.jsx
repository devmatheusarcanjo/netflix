import React from 'react';
import styles from './css/FeaturedMovie.module.css';
import { pathImage } from '@/utils/createPathToTMDB.js';
import { FaPlay, IoMdAdd } from '@/components/icons/Icons';

export default function FeaturedMovie({ data, key }) {
  // Função para retornar a url absoluta de uma imagem da api do TMDB
  /*
    const urlImage = pathImage({
        filePath: data["poster_path"]
    })
    */
  // <img src={urlImage}/>

  // <div data-item="hover"></div>

  return (
    <div className={styles.container}>
      <div className={styles.containerBorder} data-item="withhover-white5">
        <div className={styles.content}>
          <img
            src="https://image.tmdb.org/t/p/original/wXWnUhdnSuADRp9w7aAZNHx682v.jpg"
            alt="Imagem"
          />
          <div className={styles.darken}></div>
          <div className={styles.content2}>
            <div className={styles.details}>
              <span>Animação</span>
              <span>Feliz</span>
              <span>Amizade</span>
            </div>
            <div className={styles.containerButtons}>
              <button
                className={styles.watchButton}
                data-item="with-hover"
                data-color="black-.3"
              >
                <FaPlay />
                Assistir
              </button>
              <button className={styles.myListButton} data-item="with-hover">
                <IoMdAdd size={23} />
                Minha lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
