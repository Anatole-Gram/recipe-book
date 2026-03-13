import React from "react";
import styles from "./recipes.module.scss";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "./recipes-filter-bar/RecipesFilterBar";
import RecipesList from "@/components/recipes/recipes-list/RecipesList";
import type { DBRecipe } from "@/store/store.types"
import Recipe from "@/components/recipes/recipe-card/Recipe-Card";
 

export default function Recipes(props: any) {

    const recipesList = useSelector((state: RootState) => state.recipes.list) 

    const [currentRecipe, setCurrentRecipe] = React.useState<DBRecipe | {}>({})
    const [showRecipe, setShowRecipe] =  React.useState<boolean>(false)

    React.useEffect(() => {
        if(Object.keys(currentRecipe).length) {
            setShowRecipe(true) 
        } else setShowRecipe(false)
    }, [currentRecipe])

    return (

        <>
                {showRecipe && <Recipe  recipe={currentRecipe as DBRecipe}/>}
                <h4 className={styles.title}>Рецепты</h4>
                <FilterBar className={showRecipe ? styles.hide : ''}/> 

                <RecipesList recipes={recipesList} selectRecipe={setCurrentRecipe} className={`${styles.recipes} ${showRecipe ? styles.hide : ''}`}/>

        </>
        
    )
}