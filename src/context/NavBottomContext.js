import {useState, createContext} from "react";

const navBottomContext = createContext();

export default NavBottomContextProvider({children, defaultValue}) {
    const [ativo, setAtivo] = useState(defaultValue)
    
    
    return (<NavBottomContext.Provider value={{ativo, setAtivo}}>
            {children}
        </NavBottomContext.Provider>)
}


export {
    navBottomContext
}