import React, { useContext } from 'react';
import { navBottomContext } from '@/context/NavBottomContext.jsx';
import { Link } from 'react-router-dom';

/*
className={ativo === name ? styles.ativo : styles.inativo}
isAtivo={ativo === name}
        */

function IconNavBottom({ name, Active, Inactive, size, path }) {
  const { ativo, styles } = useContext(navBottomContext);

  return (
    <div>
      {ativo === name ? (
        <Active size={size} className={styles.ativo} />
      ) : (
        <Inactive size={size} className={styles.inativo} />
      )}
    </div>
  );
}

export default React.memo(IconNavBottom);
