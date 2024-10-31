import NavBar from "../components/nav-bar/NavBar.jsx";
import NavBottom from "../components/nav-bottom/NavBottom.jsx";
import styles from "./css/LayoutDefault.module.css"

export default function LayouPadrao({children, dadosHeader}) {
    
    const {comLogo, titulo, icones} = dadosHeader;
    
    return (<div className={styles.container}>
        <NavBar {...dadosHeader}/>
            <main className={styles.content}>{children}</main>        
        <NavBottom />
        </div>)
}