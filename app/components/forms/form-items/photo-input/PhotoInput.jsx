import React from "react";
import styles from "./photo-input.module.scss"
import {IMG_URL_REGEX} from "../../../../constans/regex";


export default function PhotoInput(props) {
const img =  IMG_URL_REGEX.test(props.value) ? props.value : 'https://placehold.jp/200x150.png';
   console.log(props.value)
    return(
        <div className={`${styles.photoInput} ${props.className}`}>
            <img src={img} alt="#" width={200} height={150}></img>
        <label >
            Выберите файл
            <input type="file" 
                name={props.name}/>    
        </label>
        </div>
    )
}