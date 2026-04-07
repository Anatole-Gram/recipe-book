import React from "react";
import styles from "./cross-btn.module.scss";
import CrossIcon from "@/assets/svg/close-x.svg";
import { CrossBtnProps } from "./button.types";


export default function CrossBtn({action, isPlus, disabled, className}: CrossBtnProps) {

    
    return (
        <button type="button" onClick={action} disabled={disabled}>
            <CrossIcon className={`${isPlus?styles.iconPlus:null} ${className}`}/>
        </button>
    )
}