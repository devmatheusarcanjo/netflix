import React from "react";
import styles from "./css/MovieItem.module.css"
import { pathImage } from "@/utils/createPathToTMDB.js"


export default function MovieItem({data, key}) {
    // Função para retornar a url absoluta de uma imagem da api do TMDB 
    const urlImage = pathImage({
        filePath: data["poster_path"]
    })
    
    // className={styles.over}
    //         <div  data-item="hover" data-hover="black-05"></div>
    
    return (
    <div className={`${styles.item}`} data-item="with-hover" key={data.id}>       
        <img src={urlImage}/>
    </div>
    )
}