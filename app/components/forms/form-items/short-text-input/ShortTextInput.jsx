import React from "react";
import styles from "./short-input.module.scss";

export default function ShortTextInput(props) {
const idRef = React.useRef(`id${Date.now()}`)
    return(
            <label className={`${styles.shortInput} input-item_title`}>
                {props.label}

                <input name={props.name}
                    value={props.value}
                    onChange={props.handleChange}
                    id={idRef.current}
                    className={`input-item_field`}/>

            </label>
    )
}