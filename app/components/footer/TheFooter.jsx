import React from "react";
import styles from "./footer.module.scss";
import Menu from "../forms/recipe-form/recipe-form-menu/RecipeFormMenu"
export default function TheFootrer () {
    return (
        <div className={styles.footer}>
            <Menu />
        </div>
    )
}