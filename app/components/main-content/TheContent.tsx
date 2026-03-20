import React from "react";
import Main from "@/components/user/User";
import Recipes from "@/components/recipes/Recipes";
import RecipeForm from "@/components/forms/recipe-form/RecipeForm";
import AuthUser from "@/components/forms/auth-form/ AuthFormUser";
import RegistrationForm from "../forms/registration-form/RegistrationForm";
import ProtectedRoute from "@/components/protected-route/ProtectedRoute";
import styles from "./content.module.scss"
import { Routes, Route } from "react-router-dom";

export default function TheContent () {
    return (
        <section className={styles.content}> 
            <Routes>

                <Route path={`/login`} element={ <AuthUser /> } /> 

                <Route path={`/registration`} element={ <RegistrationForm /> } />
                
                <Route path={`/recipes`} element={ <Recipes /> } />

                <Route element={<ProtectedRoute />} > 
                    <Route path={`/main`} element={ <Main /> } />
                    <Route path={`/recipe-form`} element={ <RecipeForm /> } />
                </Route>

                <Route path={`/`} element={<Recipes />}/>


            </Routes>
        </section>
    )
}