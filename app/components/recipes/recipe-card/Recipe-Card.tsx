import React from "react";
import styles from "./recipe-card.module.scss";
import type { DBRecipe } from "@/store/store.types";

type RecipeCardProps = {
    recipe: DBRecipe;
    className?: string;
}

export default function RecipeCard(props: RecipeCardProps) {
    const {recipe, className} = props

    return (
        <div className={`${styles.card} ${className ?? ''}`}>
            <span>{recipe.title }</span>
        </div>
    )
} 