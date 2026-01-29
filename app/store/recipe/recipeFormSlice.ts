import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit"; 

export interface RecipeFormState {
    step: number
}

const initialState: RecipeFormState = {
    step: 0
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
        }
    }
});

export const {increment, decrement} = recipeFormSlice.actions;
export default recipeFormSlice.reducer