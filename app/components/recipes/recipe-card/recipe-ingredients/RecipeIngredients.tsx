import React from "react";
import styles from "./recipe-ingredients.module.scss";
import type { DBIngredients } from "@/store/store.types"; 

type RecipeIngredientsProps = {
    list: DBIngredients;

    className?: string;
};

export default function RecipeIngredients(props: RecipeIngredientsProps) {
    const { list, className} = props;


    return (
        <ul className={`${className} recipeCard`}>

            <h5> список ингредиентов </h5>

            {list.map(item => {
                const { title, count, unit}  = item;
                const id = `ingredient-${item.id}`;
                return (
                    
                        <li key={ id } id={id} className={styles.ingredient}> 
                            <p className={ styles.ingredientTitle }>{ title} </p>
                            <span className={ styles.ingredientCount }>{ `${ count } ${ unit }` }</span>
                        </li>

                )
            })}
        </ul>
    )
}