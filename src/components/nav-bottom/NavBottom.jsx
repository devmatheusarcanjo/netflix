import React, { useState } from 'react';
import styles from './css/NavBottom.module.css';
import logo from '../../assets/images/netflix-logo-icone.svg';
import useStateNavBottom from '../../hooks/useStateNavBottom.js';
import IconNavBottom from './IconNavBottom.jsx';

import {
  GoHome,
  GoHomeFill,
  IoGameController,
  IoGameControllerOutline,
  VideoLine,
  VideoFill,
} from '../icons/Icons';

export default function NavBottom() {
  const [ativo, setAtivo] = useStateNavBottom('Inicio');

  const icons = [
    {
      name: 'Inicio',
      Active: GoHomeFill,
      Inactive: GoHome,
      path: '/',
    },

    {
      name: 'Jogos',
      Active: IoGameController,
      Inactive: IoGameControllerOutline,
      path: '/game',
    },

    {
      name: 'Novidades',
      Active: VideoFill,
      Inactive: VideoLine,
      path: '/news',
    },
  ];

  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        {icons.map(({ name, Active, Inactive, path }) => {
          return (
            <div
              className={styles.containerIcon}
              onClick={() => setAtivo(name)}
              key={name}
            >
              <IconNavBottom
                Active={Active}
                className={ativo === name ? styles.ativo : styles.inativo}
                isAtivo={ativo === name}
                Inactive={Inactive}
                size={30}
                path={path}
              />

              <span
                className={`${ativo === name ? styles.ativo : styles.inativo} ${
                  styles.text
                }`}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
