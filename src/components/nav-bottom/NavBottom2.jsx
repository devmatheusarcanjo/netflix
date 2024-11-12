import {useState, useContext} from "react";
import styles from "./css/NavBottom.module.css";
import logo from "@/assets/images/netflix-logo-icone.svg";
/*
import useStateNavBottom from "@/hooks/useStateNavBottom.js"
*/
import {navBottomContext} from "@/context/NavBottomContext.jsx";

import IconNavBottom from "./IconNavBottom.jsx"
import TextNavBottom from "./TextNavBottom.jsx";




import { GoHome,
    GoHomeFill,
    IoGameController,
    IoGameControllerOutline,
    VideoLine,
    VideoFill 
     } from "../icons/Icons.jsx";

export default function NavBottom() {
    const [ativo, setAtivo] = useState("Inicio")
    
            
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
    

    return (
        <navBottomContext.Provider value={{styles, ativo, setAtivo}}>
            <nav className={styles.container}>
        <div className={styles.content}>         
                                
           {icons.map(({name, Active, Inactive}) => {
               return (<div className={styles.containerIcon} onClick={() => setAtivo(name)} key={name}>
                   
                   <IconNavBottom                              
                      Active={Active} 
                      Inactive={Inactive}                                           
                      size={30}
                      name={name}
                   />                
               
                <TextNavBottom>{name}</TextNavBottom>                
               </div>)
           })}
                                             
        </div>
    </nav>
        </navBottomContext.Provider>
    )
}


