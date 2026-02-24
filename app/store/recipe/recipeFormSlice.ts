import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit"; 
import {RecipeSummary, RecipeIngredient, RecipeIngredients, RecipeStep, RecipeSteps, RecipeTuple, RecipeFormState, ValidTemplate} from "./recipeFormSlice.types"


const initialState: RecipeFormState = {
    step: 1,
    stepAvailable: false,
    valid: {summary: false, ingredients: false, step: false},
    summaryTemplate: {title: '', img: '', description: ''},
    ingredientTemplate: {title: '', count: '', unit: ''},
    stepTemplate: {description: '', img: ''},
    recipe: [{title: '', img: '', description: ''}, {}, {}]
};

const increment = (state: RecipeFormState): void => {
    state.step += 1;
};
const decrement = (state: RecipeFormState): void => {
    state.step -= 1;
};
const newIngredient = (state: RecipeFormState): void =>  {
    state.ingredientTemplate = {title: '', count: '', unit: ''};
};
const newStep = (state: RecipeFormState): void => {
    state.stepTemplate = {description: '', img: ''};
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
                const id = `id:${Date.now()}`;
                state.recipe[1][id] = {...state.ingredientTemplate};
                newIngredient(state);
        },
        setStepTemplate: (state, action: PayloadAction<Partial<RecipeStep>>): void => {
            Object.assign(state.stepTemplate, action.payload);
        },
        resetStepTemplate: (state): void => {
            newStep(state);
        },
        setRecipeStep: (state): void => {

            if(state.valid.step) {
                const id = state.stepTemplate?.id ?? `id:${Date.now()}`;
                state.recipe[2][id] = {...state.stepTemplate};
                newStep(state);
                increment(state);
            };

        },
        setStepAvalibel: (state, action: PayloadAction<boolean>) => {
            (state.stepAvailable !== action.payload) && (state.stepAvailable = action.payload)
        },
        stepForward: (state): void => {
            increment(state);
        },
        stepBack: (state): void => {
            decrement(state);
        }
    }
});

export const { stepForward, stepBack, setSummaryTemplate, setIngredientTemplate, setSummary, setValid, setIngredients, setStepTemplate, resetStepTemplate, setRecipeStep} = recipeFormSlice.actions;
export default recipeFormSlice.reducer