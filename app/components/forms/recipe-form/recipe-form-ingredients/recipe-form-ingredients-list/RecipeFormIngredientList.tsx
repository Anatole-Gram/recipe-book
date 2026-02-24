import React from "react";
import styles from "./recipe-form-ingredients-list.module.scss"
import { IngredientListProps } from "@/components/forms/recipe-form/RecipeForm.types"


export default function IngredientsList(props: IngredientListProps) {
    const  list  = props.list

    return (
        <ul className={styles.list}>
            {list.map(([id, ing], index) => {
                const {title, count, unit} = ing

                return (
                    <li key={id} className={styles.listItem}>

                        <span className={styles.circle}>
                            {index+1}
                        </span> 

                        <span>
                            {title}
                        </span>

                        {count} {unit}

                   </li>
                )
            })}
        </ul>
    )
} 