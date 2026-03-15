import React from "react";
import styles from "./recipe-card.module.scss";
import type { DBRecipe } from "@/store/store.types";
import { setRecipeIsActive } from "@/store/recipes/recipesSlice";
import { useDispatch } from "react-redux";
import Summary from "@/components/recipes/recipe-card/recipe-card-summary/RecipeCardSummary";
import Ingredients from "@/components/recipes/recipe-card/recipe-ingredients/RecipeIngredients";
import Steps from "@/components/recipes/recipe-card/recipe-steps/RecipeSteps";


type RecipeCardProps = {
    recipe: DBRecipe;
    className?: string;
}

export default function RecipeCard(props: RecipeCardProps) {

    const dispatch = useDispatch();


    React.useEffect(() => {
        dispatch(setRecipeIsActive(true));
    }, [])

    React.useEffect(() => () => {
        dispatch(setRecipeIsActive(false));
    }, [])

    const {id, title, img, description, ingredients, steps} = props.recipe
    const { className } = props

    return (
        <div className={`${styles.card} ${className ?? ''}`}>
            <Summary id={id} title={title} img={img} description={description} />
            <Ingredients list={ingredients}/>
            <Steps list={steps}/>
        </div>
    )
} 