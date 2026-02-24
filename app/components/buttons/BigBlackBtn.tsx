import React from "react";
import styles from "./big-black-btn.module.scss"
import { BigBlackBtnRpops } from "./button.types"


export default function BigBlackButton (props: BigBlackBtnRpops) {
    
    const {disabled, btnText, action, className} = props;

    return (
        <button type="button"
            disabled={disabled}
            onClick={action}
            className={`${styles.btn} ${className}`}>
                {btnText}
        </button>
    )
}