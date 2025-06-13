import { useState, useContext } from 'react';
import styles from './css/NavBottom.module.css';
import logo from '@/assets/images/netflix-logo-icone.svg';
/*
import useStateNavBottom from "@/hooks/useStateNavBottom.js"
*/
import { navBottomContext } from '@/context/NavBottomContext.jsx';

import IconNavBottom from './IconNavBottom';
import TextNavBottom from './TextNavBottom';

import {
  GoHome,
  GoHomeFill,
  IoGameController,
  IoGameControllerOutline,
  VideoLine,
  VideoFill,
} from '../icons/Icons';
import { Link } from 'react-router-dom';

export default function NavBottom() {
  const [ativo, setAtivo] = useState('Inicio');

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
    <navBottomContext.Provider value={{ styles, ativo, setAtivo }}>
      <nav className={styles.container}>
        <div className={styles.content}>
          {icons.map(({ name, Active, Inactive, path }) => {
            return (
              <Link
                to={path}
                className={styles.containerIcon}
                onClick={() => setAtivo(name)}
                key={name}
              >
                <IconNavBottom
                  Active={Active}
                  Inactive={Inactive}
                  size={30}
                  name={name}
                />

                <TextNavBottom>{name}</TextNavBottom>
              </Link>
            );
          })}
        </div>
      </nav>
    </navBottomContext.Provider>
  );
}
