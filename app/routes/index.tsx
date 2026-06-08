import React from "react";
import Main from "@/pages/main/Main";
import Recipes from "@/pages/recipes/Recipes";
import Recipe from "@/pages/recipe/Recipe";
import Auth from "@/pages/autch/Autch";
import Registration from "@/pages/registration/Registration";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
    return (
            <Routes>

                <Route path={`/login`} element={ <Auth /> } /> 

                <Route path={`/registration`} element={ <Registration /> } />
                
                <Route path={`/recipes`} element={ <Recipes /> } />

                <Route element={<ProtectedRoute />} > 
                    <Route path={`/main`} element={ <Main /> } />
                    <Route path={`/recipe-form`} element={ <Recipe /> } />
                </Route>

                <Route path={`/`} element={<Recipes />}/>
                
            </Routes>
    )
}