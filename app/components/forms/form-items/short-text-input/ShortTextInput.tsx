import React from "react";
import styles from "./short-input.module.scss";


export default function ShortTextInput(props: any) {

    return(
        <div className={`input-field ${props.className}`}>

                <input 
                    placeholder=''
                    name={props.name}
                    value={props.value}
                    onChange={props.handleChange}
                    id={props.name}
                    className={`input-field_input`}/>

                <label htmlFor={props.name} 
                    aria-label={props.label} 
                    className={`input-field_label ${styles.label}`}>

                        {props.label}

                </label>
        </div>
    )
}