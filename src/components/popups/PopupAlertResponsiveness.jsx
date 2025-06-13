import { getItem, setItem } from '../../hooks/useLocalStorage';
import styles from './css/PopupAlertResponsiveness.module.css';
import { useCallback, useRef, useState } from 'react';

export default function PopupAlertResponsiveness({ title, text, children }) {
  const [check, setCheck] = useState(false);
  const [showAlert, setAlert] = useState(() =>
    getItem('showDeviceAlert') === 'true' ? true : false
  );

  const popup = useRef(undefined);

  const dontShowAgain = useCallback(({ target }) => {
    setItem('showDeviceAlert', target.checked);
  });

  const close = useCallback(() => {
    if (popup.current) {
      popup.current.remove();
    }
  });

  return showAlert ? null : (
    <div className={styles.container} ref={popup}>
      <div className={styles.popup}>
        <h1 className={styles.title}>IMPORTANTE</h1>

        <p className={styles.text}>{children}</p>

        <div className={styles.containerButtons}>
          <div className={styles.containerCheck}>
            <input type="checkbox" onChange={dontShowAgain} />
            <span>Não mostrar novamente</span>
          </div>
          <button className={styles.buttonClose} onClick={close}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
