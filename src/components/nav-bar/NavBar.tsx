import { useState } from 'react';
import styles from './css/NavBar.module.css';
import logo from '../../assets/images/netflix-logo-icone.svg';

export default function NavBar({ withLogo = true, title, icons, key }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.containerLogo}>
          {withLogo ? (
            <img src={logo} className={styles.logo} width="40" alt="logo" />
          ) : (
            <span className={styles.titulo}>{title}</span>
          )}
        </div>
        <div className={styles.icones}>
          {icons?.length > 0 &&
            [...icons]
              .reverse()
              .map((Component) => <Component size={20} key={Component.id} />)}
        </div>
      </div>
    </nav>
  );
}
