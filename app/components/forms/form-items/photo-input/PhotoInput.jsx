import React from "react";
import styles from "./photo-input.module.scss"

export default function PhotoInput(props) {
   const img = props.value === undefined | '' ? 'https://placehold.jp/200x150.png' : props.value;
    return(
        <div className={styles.photoInput}>
            <img src={img} alt="#" width={200} height={150}></img>

            <input type="file" 
                name={props.name}/>
        </div>
    )
}