import React from "react";
import styles from "./cross-btn.module.scss";
import CrossIcon from "@/assets/svg/close-x.svg";


export default function CrossBtn(props: any) {
    const {action, disabled, className} = props;
    
    return (
        <button type="button"
            onClick={action}
            className={className}>
            <CrossIcon className={styles.icon}/>
        </button>
    )
}