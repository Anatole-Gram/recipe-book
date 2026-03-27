import React from "react";
import RecipeSummary from "@/components/recipes/recipe-card/recipe-card-summary/RecipeCardSummary";
import type { DBRecipes, DBRecipe } from "@/store/store.types";


type RecipesListProps = { 
    recipes: DBRecipes;
    selectRecipe: (recipe: DBRecipe) => void;
    className?: string;
}

export default function RecipesList(props: RecipesListProps) {

    const {recipes,selectRecipe, className} = props;
    return (
        <div className={`${className ?? ''}`}>
            {recipes.map((recipe)  => {
                const {id, title, img, description} = recipe
                return (
                    <RecipeSummary key={id} title={title} img={img} description={description} showRecipe={() => selectRecipe(recipe)}/>
                )
            })}
        </div>
    )
} 