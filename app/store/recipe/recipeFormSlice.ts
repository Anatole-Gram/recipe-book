import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit"; 
import {RecipeSummary, RecipeIngredient, RecipeIngredients, RecipeStep, RecipeSteps, RecipeTuple, RecipeFormState, } from "./recipeFormSlice.types"


const initialState: RecipeFormState = {
    step: 1,
    stepAvailable: false,
    recipe: [{title: '', img: '', description: ''}, new Map(), new Map()]
}

const recipeFormSlice = createSlice({
    name: "recipe-form",
    initialState,
    reducers: {
        increment: (state) => {
            state.step += 1;
        },
        decrement: (state) => {
            state.step -= 1;
        },
        setStepAvalibel: (state, action: PayloadAction<boolean>) => {
            (state.stepAvailable !== action.payload) && (state.stepAvailable = action.payload)
        },
        setRecipeItem: (state, action: PayloadAction<RecipeSummary>) => {
            state.recipe[state.step] = action.payload
        },
        removeRecipeItem: (state) => {
            state.recipe.splice(state.step, 1)
        }
    }
});

export const {increment, decrement, setRecipeItem} = recipeFormSlice.actions;
export default recipeFormSlice.reducer