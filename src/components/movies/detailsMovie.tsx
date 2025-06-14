import movieItemType from '../../interfaces/movieItem';
import styles from './css/MovieItem.module.css';
import { FaPlay, FaPlus, FaRegThumbsUp, FaAngleDown } from 'react-icons/fa6';

export default function DetailsMovie({ data }: movieItemType) {
  const tamanhoIcons = 20;
  return (
    <div className={styles.details} data-show-details-append>
      <div className={styles.buttonControls}>
        <i style={{ backgroundColor: 'white' }}>
          <FaPlay size={tamanhoIcons} color="#1F1F1F" />
        </i>
        <i>
          <FaPlus size={tamanhoIcons} />
        </i>

        <i>
          <FaRegThumbsUp size={tamanhoIcons} />
        </i>
        <div>
          <i>
            <FaAngleDown size={tamanhoIcons} />
          </i>
        </div>
      </div>
      <div className={styles.infos}></div>
    </div>
  );
}
