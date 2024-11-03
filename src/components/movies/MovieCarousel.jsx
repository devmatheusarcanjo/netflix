import React, {useState, useLayoutEffect, useEffect, useCallback} from "react";
import { getMovies } from "@/api/services/index.js";
import MovieItem from "./MovieItem.jsx"
import styles from "./css/MovieCarousel.module.css"
import {response, genres, getGenreName} from "./contant.js"

export default function MovieCarousel({gender}) {
    const [data, setData] = useState();
    
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
    
   
    const assembleCards = (data) => {
        return <MovieItem data={data} key={data.id}/>
    }
    
    const movies = response.results;
    const genderName = getGenreName(gender);
            
    return (<section className={styles.container}>
        
        <div className={styles.content}>
            
            <div className={styles.padding}>{genderName}</div>
            
            <div className={styles.moviesContainer}>
                {data ? data.map(assembleCards) : "Carregando"}
            </div>
        </div>
    </section>)
}