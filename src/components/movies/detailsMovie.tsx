import movieItemType from '../../interfaces/movieItem';
import styles from './css/detailsMovie.module.css';
import { FaPlay, FaPlus, FaRegThumbsUp, FaAngleDown } from 'react-icons/fa6';
import icone18 from '../../assets/png/i18.png';
import icone16 from '../../assets/png/i16.png';

export default function DetailsMovie({ data }: movieItemType) {
  const tamanhoIcons = 20;
  return (
    <div className={styles.details}>
      <div className={styles.buttonControls}>
        <i style={{ backgroundColor: 'white' }}>
          <FaPlay size={tamanhoIcons} color="#1F1F1F" />
        </i>
        <i>
          <FaPlus size={tamanhoIcons} />
        </i>

        <i className={styles.rating}>
          <FaRegThumbsUp size={tamanhoIcons} />

          <div className={styles.modalRating}>
            <i style={{ transform: 'rotate(180deg)' }}>
              <FaRegThumbsUp size={tamanhoIcons} />
            </i>
            <i>
              <FaRegThumbsUp size={tamanhoIcons} />
            </i>
            {/* <i>
              <FaRegThumbsUp size={tamanhoIcons} />
            </i> */}
          </div>
        </i>
        <div style={{ flex: '1' }}>
          <i>
            <FaAngleDown size={tamanhoIcons} />
          </i>
        </div>
      </div>
      <div className={styles.infos}>
        <div className={styles.containerTitle}>
          <span className={styles.title}>{data.title}</span>
        </div>
        <img
          className={styles.ageRatingIcon}
          src={icone16}
          width="100"
          height="100"
          alt="Para maior de 18 anos"
        />
      </div>
    </div>
  );
}
