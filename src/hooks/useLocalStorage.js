import { useState, useEffect } from "react";


export default function useLocalStorage(key, defaultValue) {
     if(!key) throw new Error("Nenhuma key foi passada como parametro para o hook useLocalStorage")

     const [value, setValue] = useState(() => {
         return window.localStorage.getItem(key) || defaultValue                  
     });          
     
     
     useEffect(() => {
         window.localStorage.setItem(key, value);
     }, value);                                    
     
     return [value, setValue];
     
}

export function getItem(key) {
    return window.localStorage.getItem(key)
}

export function setItem(key, value) {
    try {
        window.localStorage.setItem(key, value);
        return true;
    } catch (erro) {
        console.error(erro);
        return false;
    }        
}