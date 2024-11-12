import generateHash from "./generateHash";
import { getItem, setItem } from "@/hooks/useLocalStorage.js"

export function getCache(...dadosHash) {
    const hash = generateHash(...dadosHash);      
    return getItem(hash)   
}

export function setCache(valor, ...dadosHash) {
   if(dadosHash.length < 1) throw new Error("O segundo argumento para o setCache devem ser um objeto");
    const hash = generateHash(...dadosHash);
    setItem(hash, valor)        
    return true;
}