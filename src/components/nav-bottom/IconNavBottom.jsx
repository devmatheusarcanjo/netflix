import React, { useContext } from "react";
import { navBottomContext } from "@/context/NavBottomContext.jsx";

/*
className={ativo === name ? styles.ativo : styles.inativo}
isAtivo={ativo === name}
        */

function IconNavBottom({name, Active, Inactive, size}) {
    const {ativo, styles} = useContext(navBottomContext);


    return (
      <>
          {ativo === name ? (
              <Active size={size} className={styles.ativo}/>
          ) : (
              <Inactive size={size} className={styles.inativo}/>
          )}
      </>
    )
}


export default React.memo(IconNavBottom);
