import React from "react";
import styles from "./bigBlackBtn.module.scss"
import { BigBlackBtnRpops } from "./button.types"
export default function BigBlackButton (props: BigBlackBtnRpops) {



    return (
        <button type="button"
            disabled={props.disabled}
            onClick={props.btnAction}
            className={styles.btn}>
                {props.btnText}
        </button>
    )
}