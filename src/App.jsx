import { useState, useRef, useEffect } from 'react';
import LayoutPadrao from './templates/LayoutDefault.jsx';
import { FaSearch, FaDownload } from './components/icons/Icons.jsx';
import Home from '@/pages/Home.jsx';
import styles from './App.module.css';
import useTouchHover, { styleHover } from '@/hooks/useTouchHover.js';
import PopupAlertResponsiveness from './components/popups/PopupAlertResponsiveness.jsx';
import ifDeviceMobile from './utils/ifDeviceMobile.js';

function App() {
  const [dadosHeader, setDadosHeader] = useState({
    comLogo: true,
    titulo: 'Minha conta',
    icones: [FaSearch, FaDownload],
  });

  const mobile = ifDeviceMobile();

  const content = useRef(null);
  useTouchHover(content);

  // ABRIR EM TELA CHEIA
  useEffect(() => {
    function full() {
      content.current
        .requestFullscreen()
        .then(console.log)
        .catch(console.error);
    }

    content.current.addEventListener(
      'click',
      (event) => {
        console.log('foi');
        full();
      },
      { once: true }
    );
  }, [content]);

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
          <LayoutPadrao dadosHeader={dadosHeader}>
            <Home />
          </LayoutPadrao>
        </div>
      </div>
    </>
  );
}

export default App;
