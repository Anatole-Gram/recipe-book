import React from "react";
import styles from "./long-input.module.scss";


export default function LongTextInput(props) {
    const idRef = React.useRef(`id${Date.now()}`)
    return(
        <label className={`${styles.longInput} input-item_title`}>
            {props.name}

            <textarea 
                value={props.value}
                name={props.name}
                onChange={props.handleChange}
                id={idRef.current}
                className="input-item_field input-item">
            </textarea> 

        </label>
    );
};