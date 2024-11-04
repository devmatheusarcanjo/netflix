import React, {useMemo, useRef, useState, useLayoutEffect, useEffect, useCallback} from "react";
import { getMovies } from "@/api/services/index.js";
import MovieItem from "./MovieItem.jsx"
import styles from "./css/MovieCarousel.module.css"
import {response, genres, getGenreName} from "./contant.js"
import useScrollWidthCalculation from "@/hooks/useScrollWidthCalculation.js"

export default function MovieCarousel({gender}) {
    const [data, setData] = useState([]);
    const moviesContainer = useRef()
       
    useScrollWidthCalculation({element: moviesContainer.current, getMovies, setData, gender})
    
   
    
    /*
    useEffect(() => {
         
        getMovies({
          cache: true,
          params: {
              with_genres: gender
          }
        }).then(e => {                       
            setData(e.results);
        })                      
                                                                   
    }, [])
    */
    
   
    const assembleCards = (data) => {
        return data.map(item => {       
           return <MovieItem data={item} key={item.id}/>                    
                                    
        })
    }
    
    const movies = response.results;
    const genderName = getGenreName(gender);
            
    return (<section className={styles.container}>
        
        <div className={styles.content}>
            
            <div className={styles.padding}>{genderName}</div>
            
            <div ref={moviesContainer} className={styles.moviesContainer}>
                {data ? data.map(assembleCards) : "Carregando"}
            </div>
        </div>
    </section>)
}