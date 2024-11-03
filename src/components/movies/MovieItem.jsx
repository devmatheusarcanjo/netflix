import React from "react";
import styles from "./css/MovieItem.module.css"
import { pathImage } from "@/utils/createPathToTMDB.js"

export default function MovieItem({data, key}) {
    // Função para retornar a url absoluta de uma imagem da api do TMDB 
    const urlImage = pathImage({
        filePath: data["poster_path"]
    })
    
    return (
    <div className={styles.item} data-item="card" key={data.id}>       
        <img src={urlImage}/>
        <div className={styles.over} data-item="over"></div>
    </div>
    )
}