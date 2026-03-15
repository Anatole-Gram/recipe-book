import React from "react";
import styles from "./recipes.module.scss";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import FilterBar from "./recipes-filter-bar/RecipesFilterBar";
import RecipesList from "@/components/recipes/recipes-list/RecipesList";
import type { DBRecipe } from "@/store/store.types"
import Recipe from "@/components/recipes/recipe-card/Recipe-Card";
 

export default function Recipes() {

    const { list, recipeIsActive } = useSelector((state: RootState) => state.recipes);

    const [currentRecipe, setCurrentRecipe] = React.useState<DBRecipe | null>(null);

    React.useEffect(() => {
        if(!recipeIsActive) {setCurrentRecipe(null)};
    }, [recipeIsActive])


    return (

        <>
                {currentRecipe && <Recipe  recipe={currentRecipe as DBRecipe} />}

                <h4 className={`${styles.title} ${currentRecipe ? styles.hide : ''}`}>Рецепты</h4>

                <FilterBar className={currentRecipe ? styles.hide : ''}/> 
                
                <RecipesList recipes={ list } selectRecipe={setCurrentRecipe} className={`${styles.recipes} ${currentRecipe ? styles.hide : ''}`}/>

        </>
        
    )
}