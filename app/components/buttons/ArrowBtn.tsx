import React from "react";
import styles from "./arrow-btn.module.scss"
import ArrowLeft from "@/assets/svg/left-arrow.svg";
import ArrowRight from "@/assets/svg/right-arrow.svg";
import { ArrowBtnProps } from "./button.types";

export default function ArrowBtn(props: ArrowBtnProps) {
    const {action, disabled, direction, className} = props;

    const arrow: {0: typeof ArrowLeft, 1: typeof ArrowRight} = {
        0: ArrowLeft, 
        1: ArrowRight
    };

    const Icon = arrow[direction]

    return(
        <button
            disabled={!disabled}
            onClick={action}
            className={styles.btn}>
                <Icon className={className}/>
        </button>
    )
}