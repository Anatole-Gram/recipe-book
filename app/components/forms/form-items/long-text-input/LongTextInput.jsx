import React from "react";
import styles from "./long-input.module.scss";


export default function LongTextInput(props) {
    return(
        <div className="input-field">

            <textarea 
                aria-label={props.label}
                placeholder=""
                value={props.value}
                name={props.name}
                onChange={props.handleChange}
                id={props.name}
                className={`input-field_input ${styles.input}`}>
            </textarea> 
            <label 
                htmlFor={props.name}
                className={`input-field_label ${styles.label}`}>
                    {props.label}
            </label>
        </div>
    );
};