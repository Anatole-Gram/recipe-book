import React from "react";
import * as styles from "./recipe-form-menu.module.scss"
import ArrowLeft from "@/assets/svg/left-arrow.svg"
import ArrowRight from "@/assets/svg/right-arrow.svg"

export default function RecipeFomMenu(props) {

    return(
        <div className={styles.menu}>
            <ArrowLeft width={50} height={50}  className={styles.icon}/>
            <ArrowRight width={50} height={50}  className={styles.icon}/>
        </div>
    )
}