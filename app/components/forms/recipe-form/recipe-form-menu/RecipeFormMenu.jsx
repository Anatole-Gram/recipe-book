import React from "react";
import styles from "./recipe-form-menu.module.scss"
import ArrowLeft from "@/assets/svg/left-arrow.svg"
import ArrowRight from "@/assets/svg/right-arrow.svg"
import AddOrClose from "@/assets/svg/close-x.svg"

export default function RecipeFormMenu(props) {

    return(
        <div className={styles.menu}>
            <ArrowLeft width={40} height={40}  className={styles.icon}/>
            <AddOrClose width={40} height={40}  className={styles.icon}/>
            <ArrowRight width={40} height={40}  className={styles.icon}/>
        </div>
    )
}