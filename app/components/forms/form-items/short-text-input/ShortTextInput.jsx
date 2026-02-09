import React from "react";
import styles from "./short-input.module.scss";

export default function ShortTextInput(props) {
    return(
            <label className={`${styles.shortInput} input-item_title`}>
                {props.label}

                <input name={props.name}
                    value={props.value}
                    onChange={props.handleChange}
                    className={`input-item_field`}/>

            </label>
    )
}