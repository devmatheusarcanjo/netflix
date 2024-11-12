import { useState, useRef, useEffect} from 'react';
import LayoutPadrao from "./templates/LayoutDefault.jsx"
import { FaSearch, FaDownload } from "./components/icons/Icons.jsx";
import Home from "@/pages/Home.jsx"
import styles from './App.module.css'
import useTouchHover, {styleHover} from "@/hooks/useTouchHover.js";


function App() {
const [dadosHeader, setDadosHeader] = useState({
    comLogo: true,
    titulo: "Minha conta",
    icones: [FaSearch, FaDownload]
})

    const content = useRef(null)
    useTouchHover(content)



// ABRIR EM TELA CHEIA
useEffect(() => {

    function full() {                
        content.current.requestFullscreen()
        .then(console.log)
        .catch(console.error)   
    }

    window.addEventListener("click", (event) => {
        console.log("foi")
        full()        
    }, {once: true})
    
},[content])


    
  
  return (
    <div className={`${styles.container} ${styleHover.global}`} ref={content}>
      <LayoutPadrao dadosHeader={dadosHeader}>
          <Home />
      </LayoutPadrao>
    </div>
  )
}

export default App
