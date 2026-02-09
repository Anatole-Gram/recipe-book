import React from "react";
import styles from "./bigBlackBtn.module.scss"


export default function BigBlackButton (props: any) {



    return (
        <button type="button"
            onClick={props.btnAction}
            className={styles.btn}>
                {props.btnText}
        </button>
    )
}