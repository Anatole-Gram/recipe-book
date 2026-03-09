import React from "react";
import styles from "./recipes.module.scss";
import FilterBar from "./recipes-filter-bar/RecipesFilterBar";


export default function Recipes(props: any) {

    return (

        <>

                <h4 className={styles.title}>Рецепты</h4>
                <FilterBar /> 

        </>
        
    )
}