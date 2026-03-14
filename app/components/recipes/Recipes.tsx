import React from "react";
import styles from "./recipes.module.scss";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setRecipeIsVisible } from "@/store/recipes/recipesSlice";
import FilterBar from "./recipes-filter-bar/RecipesFilterBar";
import RecipesList from "@/components/recipes/recipes-list/RecipesList";
import type { DBRecipe } from "@/store/store.types"
import Recipe from "@/components/recipes/recipe-card/Recipe-Card";
 

export default function Recipes() {

    const dispatch = useDispatch();
    const { list, recipeIsVisible } = useSelector((state: RootState) => state.recipes);

    const [currentRecipe, setCurrentRecipe] = React.useState<DBRecipe | {}>({});
    React.useEffect(() => {
        if(Object.keys(currentRecipe).length) {
            dispatch(setRecipeIsVisible(true))
        } else dispatch(setRecipeIsVisible(false))
    }, [currentRecipe])

    return (

        <>
                {recipeIsVisible && <Recipe  recipe={currentRecipe as DBRecipe}/>}

                <h4 className={`${styles.title} ${recipeIsVisible ? styles.hide : ''}`}>Рецепты</h4>

                <FilterBar className={recipeIsVisible ? styles.hide : ''}/> 
                
                <RecipesList recipes={ list } selectRecipe={setCurrentRecipe} className={`${styles.recipes} ${recipeIsVisible ? styles.hide : ''}`}/>

        </>
        
    )
}