import { useState, useRef, useEffect } from 'react';
import LayoutPadrao from './templates/LayoutDefault';
import { FaSearch, FaDownload } from './components/icons/Icons';
import Home from '@/pages/Home.jsx';
import styles from './App.module.css';
import useTouchHover, { styleHover } from '@/hooks/useTouchHover.js';
import PopupAlertResponsiveness from './components/popups/PopupAlertResponsiveness.jsx';
import ifDeviceMobile from './utils/ifDeviceMobile.js';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Game from './pages/Game.jsx';
import News from './pages/News.jsx';
import MyNetflix from './pages/MyNetflix.jsx';

import dataPages from './pages/dataPage/dataPages';

function App() {
  const mobile = ifDeviceMobile();

  const content = useRef(null);
  useTouchHover(content);

  // // ABRIR EM TELA CHEIA
  // useEffect(() => {
  //   function full() {
  //     content.current
  //       .requestFullscreen()
  //       .then(console.log)
  //       .catch(console.error);
  //   }

  //   content.current.addEventListener(
  //     'click',
  //     (event) => {
  //       console.log('foi');
  //       full();
  //     },
  //     { once: true }
  //   );
  // }, [content]);

  return (
    <>
      {/* Ira exibir o popup somente se o dispositivo não for mobile */}
      {mobile ? null : (
        <PopupAlertResponsiveness>
          Este projeto está sendo desenvolvido com foco em dispositivos móveis,
          e algumas funcionalidades não funcionam corretamente neste
          dispositivos. Para uma experiência ideal, recomendamos acessá-lo por
          meio de um dispositivo móvel.
        </PopupAlertResponsiveness>
      )}

      <div className={styles.containerCenter} ref={content}>
        <div className={`${styles.container} ${styleHover.global}`}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <LayoutPadrao dadosHeader={dataPages.homePageData}>
                    <Home />
                  </LayoutPadrao>
                }
              />
              <Route
                path="/game"
                element={
                  <LayoutPadrao dadosHeader={dataPages.gamePageData}>
                    <Game />
                  </LayoutPadrao>
                }
              />
              <Route
                path="/news"
                element={
                  <LayoutPadrao dadosHeader={dataPages.newsPageData}>
                    <News />
                  </LayoutPadrao>
                }
              />
              <Route
                path="/my-netflix"
                element={
                  <LayoutPadrao dadosHeader={dataPages.myNetflixPageData}>
                    <MyNetflix />
                  </LayoutPadrao>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
