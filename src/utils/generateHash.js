import CryptoJs from "crypto-js";

export default function checkCache(...args) {
    const string = args.map(data => {
        if(typeof data === "object") return JSON.stringify(data);
            else 
        return data.toString();
    }).join("");         
                 
            
    const noSpace = string.replace(/\s+/g,"")    
    const hash = CryptoJs.MD5(noSpace).toString();
            
    return hash;
}
