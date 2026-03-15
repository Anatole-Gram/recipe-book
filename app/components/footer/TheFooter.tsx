import React from "react";
import styles from "./footer.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FormMenu from "@/components/forms/recipe-form/recipe-form-menu/RecipeFormMenu";
import RecipeMenu from "@/components/recipes/recipe-card/recipe-card-menu/RecipeCardMenu";


export default function TheFootrer () {

    const recipeIsActive = useSelector((state: RootState) => state.recipes.recipeIsActive);
    const formIsActive = useSelector((state: RootState) => state.recipeForm.formIsActive);

    return (
        <div className={styles.footer}>
            { formIsActive && (<FormMenu />) }
            { recipeIsActive && (<RecipeMenu />) }
        </div>
    )
}