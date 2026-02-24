import React from "react";
import styles from "./long-input.module.scss";


export default function LongTextInput(props) {
    const {label, value, name, id,handleChange} = props
    return(
        <div className="input-field">

            <textarea 
                aria-label={label}
                placeholder=""
                value={value}
                name={name}
                onChange={handleChange}
                id={id??0}
                className={`input-field_input ${styles.input}`}>
            </textarea> 
            <label 
                htmlFor={name}
                className={`input-field_label ${styles.label}`}>
                    {label}
            </label>
        </div>
    );
};