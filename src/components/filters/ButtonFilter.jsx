import styles from "./css/ButtonFilter.module.css"


export default function ButtonFilter({data}) {
   
    return (
        <>    
            {data.map(({name, Icon}) => {
                   return (<button className={styles.button} key={name}>
                       <span className={styles.text}>{name}</span>
                       {Icon && <Icon />}
                   </button>)
               })} 
    </>                   
    )
}