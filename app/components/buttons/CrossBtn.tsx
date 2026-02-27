import React from "react";
import styles from "./cross-btn.module.scss";
import CrossIcon from "@/assets/svg/close-x.svg";
import { CrossBtnProps } from "./button.types";


export default function CrossBtn(props: CrossBtnProps) {
    const {action, isPlus, className} = props;
    
    return (
        <button type="button" onClick={action}>
            <CrossIcon className={`${isPlus?styles.iconPlus:null} ${className}`}/>
        </button>
    )
}