import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit"; 
import {RecipeSummary, RecipeIngredient, RecipeIngredients, RecipeStep, RecipeSteps, RecipeTuple, RecipeFormState, ValidTemplate} from "./recipeFormSlice.types"


const initialState: RecipeFormState = {
    step: 1,
    stepAvailable: false,
    valid: {summary: true, ingredients: true, step: false},
    summaryTemplate: {title: '', img: '', description: ''},
    ingredientTemplate: {title: '', count: '', unit: ''},
    recipe: [{title: '', img: '', description: ''}, {}, {}]
};

const increment = (state: RecipeFormState): void => {
    state.step += 1;
};
const newIngredient = (state: RecipeFormState): void =>  {
    state.ingredientTemplate = {title: '', count: '', unit: ''};
};

const recipeFormSlice = createSlice({
    name: "recipe-form",
    initialState,
    reducers: {
        setValid: (state, action: PayloadAction<Partial<ValidTemplate>>): void => {
            Object.assign(state.valid, action.payload)
        },
        setSummaryTemplate: (state, action: PayloadAction<Partial<RecipeIngredient>>): void=> {
            Object.assign(state.summaryTemplate, action.payload);
        },
        setSummary: (state) => {
            state.valid.summary && Object.assign(state.recipe[0], state.summaryTemplate);
            increment(state);
        },
        setIngredientTemplate: (state, action: PayloadAction<Partial<RecipeIngredient>>): void => {
            Object.assign(state.ingredientTemplate, action.payload);
        },

        setIngredients: (state): void => {
            
            if(state.valid.ingredients) {
                const id = `id:${Date.now()}`;
                state.recipe[1][id] = {...state.ingredientTemplate};
                newIngredient(state);
            } 
        },
        setRecipeStep: (state) => {

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

export const {setRecipeItem, setSummaryTemplate, setIngredientTemplate, setSummary, setValid, setIngredients, setRecipeStep} = recipeFormSlice.actions;
export default recipeFormSlice.reducer