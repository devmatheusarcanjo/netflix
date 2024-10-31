import React, {useState} from "react";

export default function useStateNavBottom(defaultValue = "home") {
    const [ativo, setAtivo] = useState(defaultValue);
    
    function setActive(name) {
        setAtivo(name)
    }
    
    return [ativo, setActive];
}