import React, {useState} from "react";
import styles from "./css/NavBottom.module.css";
import logo from "../../assets/images/netflix-logo-icone.svg";
import useStateNavBottom from "../../hooks/useStateNavBottom.js";
import IconNavBottom from "./IconNavBottom.jsx";


import { GoHome,
    GoHomeFill,
    IoGameController,
    IoGameControllerOutline,
    VideoLine,
    VideoFill 
     } from "../icons/Icons.jsx";

export default function NavBottom() {
    const [ativo, setAtivo] = useStateNavBottom("Inicio");
    
            
    const icons = [
       {
            name: "Inicio",
            Active: GoHomeFill,
            Inactive: GoHome
        },
        
       {
            name: "Jogos",
            Active: IoGameController,
            Inactive: IoGameControllerOutline
        },
        
        {
            name: "Novidades",
            Active: VideoFill,
            Inactive: VideoLine
        }
    ]
    

    return (<nav className={styles.container}>
        <div className={styles.content}>         
                                
           {icons.map(({name, Active, Inactive}) => {
               return (<div className={styles.containerIcon} onClick={() => setAtivo(name)} key={name}>
                   
                   <IconNavBottom                              
              Active={Active} 
              className={ativo === name ? styles.ativo : styles.inativo}
              isAtivo={ativo === name}
              Inactive={Inactive} 
              size={30}
                   />
                
                <span className={`${ativo === name ? styles.ativo : styles.inativo} ${styles.text}`}>{name}</span>
                
                
               </div>)
           })}
                                             
        </div>
    </nav>)
}


