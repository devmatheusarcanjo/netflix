import React, {useEffect, useRef} from "react";
import FilterHome from "@/components/filters/FilterHome.jsx"
import styles from "./css/Home.module.css";
import { getMovies } from "@/api/services/index.js";
import { MovieCarousel } from "@/components/movies/index.js"
import useTouchHover from "@/hooks/useTouchHover.js";
import { getAllGenres } from "@/components/movies/contant";

const allGenres = getAllGenres();

export default function Inicio() {
    
   /* useRef utilizado para aplicar o efeito de hover nos cards de filmes */   
   const content = useRef(undefined)   
   
   /* hook personalizado pra aplicar o efeito de hover cresecente nos cards */
   useTouchHover({content, styles})
                                              
    return (<div className={styles.container} ref={content}>
        <FilterHome />                  
          {         
            allGenres.map(number => {
                return <MovieCarousel gender={number}/>    
            })            
         }
                    
    </div>)
}
