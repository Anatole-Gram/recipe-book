import React from "react";
import styles from "./photo-input.module.scss"

export default function PhotoInput(props) {
    
    return(
        <div className={styles.photoInput}>
            <img src={`${props.value}`} alt="#" width={200} height={150}></img>

            <input type="file" 
                name={props.name}/>
        </div>
    )
}