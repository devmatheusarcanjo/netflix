import React from "react";
import styles from "./css/NavBar.module.css";
import logo from "../../assets/images/netflix-logo-icone.svg"

export default function NavBar({comLogo = true, titulo, icones}) {


    return (<nav className={styles.container}>
        <div className={styles.content}>
            <div className={styles.containerLogo}>
                {comLogo ? (
                    <img src={logo} className={styles.logo} width="40" alt="logo"/>
                ) : (
                    <span className={styles.titulo}>
                        {titulo}
                    </span>
                )}
            
            </div>
            <div className={styles.icones}>
                {icones?.length > 0 && icones.map(Component => <Component size={20} key={Component}/>)}
            </div>
        </div>
    </nav>)
}
