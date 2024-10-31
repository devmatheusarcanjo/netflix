import { useState } from 'react';
import LayoutPadrao from "./templates/LayoutDefault.jsx"
import { FaSearch, FaDownload } from "./components/icons/Icons.jsx";
import {VideoLine, VideoFill} from "./components/icons/Icons.jsx";

import styles from './App.module.css'


function App() {
const [dadosHeader, setDadosHeader] = useState({
    comLogo: true,
    titulo: "Minha conta",
    icones: [FaSearch, FaDownload]
})

  
  return (
    <div className={styles.container}>
      <LayoutPadrao dadosHeader={dadosHeader}>
          <VideoFill size={80}/>
      </LayoutPadrao>
    </div>
  )
}

export default App
