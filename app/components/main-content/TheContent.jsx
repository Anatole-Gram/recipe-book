import React from "react";
import Recipes from "@/components/recipes/Recipes";
import RecipeForm from "../forms/recipe-form/RecipeForm";
import styles from "./content.module.scss"
import { Routes, Route } from "react-router-dom";

export default function TheContent () {
    return (
        <section className={styles.content}> 
            <Routes>
                <Route path={`/`} element={ <Recipes /> } />
                <Route path={`/recipes`} element={ <Recipes /> } />
                <Route path={`/recipe-form`} element={ <RecipeForm /> } />
            </Routes>
        </section>
    )
}