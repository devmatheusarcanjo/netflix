import { useEffect, useCallback, useState} from "react";
import serviceScrollWidthCalculation from "@/utils/serviceScrollWidthCalculation.js";


export default function useScrollWidthCalculation({element, setData, getMovies, gender}) {
    const [condition, setCondition] = useState([]);
    const [page, setPage] = useState(1)
    
    const handleCondition = useCallback((event) => {
            
    const result =     serviceScrollWidthCalculation({event, condition, setCondition})       
       
       if(result) { 
              setPage(page + 1)                                                       
              console.log(condition)
              console.log(page)
              setCondition(result)
        }
           
                
    }, [element, condition, page])
    
    
    
    useEffect(() => {                
        getMovies({
          cache: true,
          params: {
              with_genres: gender,
              page
          }
        }).then(e => {                       
            setData(before => [...before, e.results]);
        })         
    }, [page])
    
    
    
    
    useEffect(() => {
        
        if(!element) return;
        
        element.addEventListener("scroll", handleCondition)
        
        return () => {
            element.removeEventListener("scroll", handleCondition);
        }
        
    }, [handleCondition])
    
    
} 