import axios from "axios";
import { setItem } from "@/hooks/useLocalStorage.js"
import { getCache, setCache } from "@/utils/useCache.js";

const apiDefault = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        "content-type": "application/json"
    },
    params: {
        language: "pt-BR",
        api_key: import.meta.env.VITE_API_KEY
    }
})

/*

function generateTimeStamp(type, time) {
    
    switch(type) {
        case day:
            return 1000 * 60 * 60 * 24
    }
    
}

function validateTimeStamp() {
    
}

*/



async function api(url, options) {       
    const optionsForFetch = {...options, cache: undefined};
    const urlForFetch = url; // Isso esta sendo feito porque o axios está alterando o valor da variavel url e bugando o codigo.
        
    
    if (options.cache) {                    
        const cache = getCache(url, {...options, cache: undefined})                                          
      if (cache) {        
        console.log("Itens obtidos do LocalStorage")
        return JSON.parse(cache)
      };
    }    
    
    const response = await apiDefault(urlForFetch, optionsForFetch);

    if(options.cache) {                 
        setCache(JSON.stringify(response.data), url, {...options, cache: undefined})              
        
    }
        
    return response.data;
}


export default api;
