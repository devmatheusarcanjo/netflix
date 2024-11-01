import styles from "./css/FilterHome.module.css";
import {useState} from "react"
import ButtonFilter from "./ButtonFilter.jsx"
import {IoIosArrowDown} from "@/components/icons/Icons.jsx"

export default function FilterHome() {
    const [items, setItems] = useState([
         {
            name: "Filmes",         
        },
        {
            name: "Series",
           
        },
        {
            name: "Categorias",
            Icon: IoIosArrowDown
        }
    ])
    
    return (
        <div className={styles.container}>
         <div className={styles.content}>
               <ButtonFilter data={items}/>
         </div>        
       </div>
    )
}