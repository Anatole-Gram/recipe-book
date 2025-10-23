import React from "react";
import * as styles from "./footer.module.scss";
import RecipeFomMenu from "../forms/recipe-form/recipe-form-menu/RecipeFomMenu";
export default function TheFootrer () {
    return (
        <div className={styles.footer}>
            <RecipeFomMenu />
        </div>
    )
}