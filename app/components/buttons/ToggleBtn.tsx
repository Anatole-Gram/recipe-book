import React from "react";
import styles from "./toggle-btn-tsx.module.scss";
import type { ToggleBtnProps } from "@/components/buttons/button.types";



export default function RadioBtn(props: ToggleBtnProps) {

    const { action, disabled } = props;
    const toggleAction = () => action(!disabled)
    return (
        <div onClick={toggleAction} className={`${styles.toggle} ${!disabled ? styles.toggleOf : styles.toggleOn}`}>
            <div className={`${styles.toggleCircle} ${!disabled ? styles.toggleCircleOf : styles.toggleCircleOn}`}></div>
        </div>
    )
}
