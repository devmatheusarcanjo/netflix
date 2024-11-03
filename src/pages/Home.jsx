import React, {useEffect, useRef} from "react";
import FilterHome from "@/components/filters/FilterHome.jsx"
import styles from "./css/Home.module.css";
import { getMovies } from "@/api/services/index.js";
import { MovieCarousel } from "@/components/movies/index.js"
import useTouchHover from "@/hooks/useTouchHover.js";

export default function Inicio() {
    
   /* useRef utilizado para aplicar o efeito de hover nos cards de filmes */   
   const content = useRef(undefined)   
   
   /* hook personalizado pra aplicar o efeito de hover cresecente exatamente igual o da netflix */
   useTouchHover({content, styles})
                                     
    
    return (<div className={styles.container} ref={content}>
        <FilterHome />        
        <MovieCarousel gender={99}/>       
        <MovieCarousel gender={80}/>                  
    </div>)
}
