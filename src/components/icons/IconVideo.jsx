import React from "react";
import { RiVideoLine, RiVideoFill } from "react-icons/ri";

import styles from "./css/IconVideo.module.css"

const VideoLine = ({className, size = 10, ...args}) => {
    size = size - 5;
    return (<div className={styles.container}>        
         <RiVideoLine {...args} size={size} className={styles.icon2 + " " + className }/> 
         <RiVideoLine {...args} size={size} className={styles.icon1 + " " + className }/>  
    </div>)
}

const VideoFill = ({className, size = 10, ...args}) => {
    
    size = size - 5;
    return (<div className={styles.container}>        
         <RiVideoLine {...args} size={size} className={styles.icon2 + " " + className}/> 
         <RiVideoFill {...args} size={size} className={styles.icon1 + " " + className}/>  
    </div>)
}

export {VideoLine, VideoFill};