import React from "react";
import styles from "./recipe-card-summary.module.scss";
import imgStub from "@/assets/images/recipe-img-stub.png";

type RecipeCardSummaryProps = {
    id: number | string;
    title: string;
    img: string;
    description: string;
    showRecipe?: () => void;
    className?: string;
}
export default function RecipeCardSummary(props: RecipeCardSummaryProps) {


    const {id, title, img, description, showRecipe, className} = props;

    return(
        <div onClick={showRecipe} className={`${styles.card} ${className ?? ''} recipeCard`}>
            <span className={styles.title}>{title}</span>
            <img src={!img ? imgStub : img} alt="product image" width={100} height={100} className={styles.img}/>
            <p className={styles.description}>{description}</p>
        </div>
    )
}










// название рецепта

// Описание рецепта не менее 10 букв.
// Краткое описание блюда и его приготовления.
// Обязательно к заполнению.

// ингредиент из списка ингредиентов

// шаг рецепта:
// поэтапное описание приготовления блюда.
// Что нужно взять, что сделать.
// сколько и как готовить.