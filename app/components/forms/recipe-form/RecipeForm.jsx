import React from "react"; 
import * as styles from "./form.module.scss";
import RecipeFormSummary from "./recipe-form-summary/RecipeFormSummary";

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
    </form>)
}