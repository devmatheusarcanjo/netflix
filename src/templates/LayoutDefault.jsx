import {useRef, useEffect} from "react"
import NavBar from "../components/nav-bar/NavBar.jsx";
import NavBottom from "../components/nav-bottom/NavBottom2.jsx";
import styles from "./css/LayoutDefault.module.css"

export default function LayouPadrao({children, dadosHeader}) {

const ref = useRef(null)

useEffect(() => {
        console.log("entrou")
        const handleScroll = function() {
            console.log(this.scrollY)
        } 
        
        ref.current.addEventListener("scroll", handleScroll)
        
    }, [ref])
    
    const {comLogo, titulo, icones} = dadosHeader;
    
    return (<div className={styles.container}>
        <NavBar {...dadosHeader}/>
            <main className={styles.content} ref={ref}>{children}</main>        
        <NavBottom />
        </div>)
}
