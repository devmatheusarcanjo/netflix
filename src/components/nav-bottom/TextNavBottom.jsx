import {useContext} from "react";
import {navBottomContext} from "@/context/NavBottomContext.jsx";



export default function textNavBottom({children}) {
    const {ativo, styles} = useContext(navBottomContext);

    return (<span className={`${ativo === children ? styles.ativo : styles.inativo} ${styles.text}`}>{children}</span>)
}
