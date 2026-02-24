import React from "react";
import RemoveIcon from "@/assets/svg/remove.svg";
import styles from "./remove-btn.module.scss";
import { BtnProps } from "./button.types"
 
export default function RemoveBtn(props: BtnProps) {
    
    const {className, action} = props

    return (
        <button type="button"
            onClick={action}
            className={styles.btn}>
                <RemoveIcon className={className}/>
        </button>
    )
};