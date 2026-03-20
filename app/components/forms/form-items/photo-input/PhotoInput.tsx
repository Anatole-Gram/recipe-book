import React from "react";
import styles from "./photo-input.module.scss";
import type { ClassNamesPhotoInput } from "./classNames";
import {IMG_URL_REGEX} from "@/constans/regex";


type PhotoInputProps = {
    name: string;
    value: string;
    handleChange: () => void;
    label?: string; 
    title?: string; 
    classNames?: ClassNamesPhotoInput;
}

export default function PhotoInput(props: PhotoInputProps) {

const {name, value, label, title} = props;
const classFor = props.classNames;

const img =  IMG_URL_REGEX.test(value) ? value : 'https://placehold.jp/200x150.png';

    return(
        <div className={classFor?.wrapper ?? ''}>
            <img src={img} alt="#" width={150} height={150} className={classFor?.img} />
            <label 
                className={classFor?.label}>
                    {`${label ?? 'Выберите файл'}`}
                    <input type="file" 
                        name={name}
                        className={styles.input}/>    
            </label>
            <span className={classFor?.title ?? ''}> {title} </span>
        </div>
    )
}