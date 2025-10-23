import React from "react";
import RecipeForm from "../forms/recipe-form/RecipeForm";
import * as styles from "./content.module.scss"

export default function TheContent () {
    return (
        <section className={styles.content}> 
            <RecipeForm />
        </section>
    )
}