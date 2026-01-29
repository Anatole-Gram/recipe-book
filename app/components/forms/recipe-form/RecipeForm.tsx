import React from "react"; 
import styles from "./recipe-form.module.scss";
import RecipeFormSummary from "./recipe-form-summary/RecipeFormSummary";
import RecipeFormMenu from "./recipe-form-menu/RecipeFormMenu";


export default function RecipeForm() {
    const [recipe, setRecipe] = React.useState({

        step: 0, 
    });

    React.useEffect(() => {

        console.log(recipe)
    }, [recipe])

    return(
    <form className={styles.recipeForm}>
        <h3>новый рецепт</h3>
        <RecipeFormSummary setRecipe={setRecipe}/>
        <RecipeFormMenu />
    </form>)
}