import { useRef, useEffect, ReactNode } from 'react';
import NavBar from '../components/nav-bar/NavBar.jsx';
import NavBottom from '../components/nav-bottom/NavBottom2.jsx';
import styles from './css/LayoutDefault.module.css';
import DataPageInterface from '../pages/dataPage/dataPages.js';
import { LayoutPadraoInterface } from '../interfaces/layoutPadrao.js';

export default function LayouPadrao({
  children,
  dadosHeader,
}: LayoutPadraoInterface) {
  return (
    <div className={styles.container}>
      <NavBar {...dadosHeader} />
      <main className={styles.content}>{children}</main>
      <NavBottom />
    </div>
  );
}
