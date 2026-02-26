import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit"; 
import {RecipeSummary, RecipeIngredient, RecipeIngredients, RecipeStep, RecipeSteps, RecipeTuple, RecipeFormState, ValidTemplate} from "./recipeFormSlice.types"


const initialState: RecipeFormState = {
    step: 1,
    stepEditor: false,
    valid: {summary: false, ingredients: false, step: false},
    summaryTemplate: {title: '', img: '', description: ''},
    ingredientTemplate: {title: '', count: '', unit: ''},
    stepTemplate: {description: '', img: ''},
    recipe: [{title: '', img: '', description: ''}, {}, {'id1234': {id:'id1234', description: 'test 1', img: ''}, 'id1244': {id:'id1244', description: 'test 2', img: ''}}]
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
const nextStepTemplate = (state: RecipeFormState, id: string|null ): void => {
    if(!id) { 
        state.stepTemplate = {description: '', img: ''};
    } else {
        Object.assign(state.stepTemplate, state.recipe[2][id]);
    };

};

const recipeFormSlice = createSlice({
    name: "recipe-form",
    initialState,
    reducers: {
        setValid: (state, action: PayloadAction<Partial<ValidTemplate>>): void => {
            Object.assign(state.valid, action.payload)
        },

        // Summary
        setSummaryTemplate: (state, action: PayloadAction<Partial<RecipeIngredient>>): void=> {
            Object.assign(state.summaryTemplate, action.payload);
        },
        setSummary: (state) => {
            state.valid.summary && Object.assign(state.recipe[0], state.summaryTemplate);
            increment(state);
        },

        // Ingredients
        setIngredientTemplate: (state, action: PayloadAction<Partial<RecipeIngredient>>): void => {
            const id = action.payload?.id;
            const sources = id ? {...state.recipe[1][id], ...action.payload} : action.payload;
            Object.assign(state.ingredientTemplate, sources);
        },

        setIngredients: (state): void => {
                const id = state.ingredientTemplate?.id ?? `id:${Date.now()}`;
                const target = state.recipe[1]?.[id];
                if (target) {
                    state.recipe[1][id] = {...target, ...state.ingredientTemplate}
                } else state.recipe[1][id] = {...state.ingredientTemplate};
                newIngredient(state);
        },
        removeIngredient: (state, action: PayloadAction<string>): void => {
            const id = action.payload;
            delete state.recipe[1][id];
        },
        // Steps
        setStepTemplate: (state, action: PayloadAction<Partial<RecipeStep>>): void => {
            const id = action.payload?.id;
            const sources = id ? {...state.recipe[2][id], ...action.payload} : action.payload;
            Object.assign(state.stepTemplate, sources);
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
        removeStep: (state, action: PayloadAction<string>): void => {

            const deleted = action.payload;
            const steps = state.recipe[2];
            const keys = Object.keys(steps || {});
            const idx = keys.findIndex(key => key === deleted);

            let nextTemplateId: string | null = null;

            if (idx >= 0) {
                const hasRight = idx < keys.length - 1;
                const hasLeft = idx > 0;

                if (hasRight) {
                    nextTemplateId = keys[idx + 1];
                    increment(state);

                } else if (hasLeft) {
                    nextTemplateId = keys[idx - 1];
                    decrement(state);

                } else {
                    nextTemplateId = null;
                }
            }

            nextStepTemplate(state, nextTemplateId);
            if (idx >= 0) {
                delete steps[deleted];
        }
        },
        setStepEditor: (state, action: PayloadAction<boolean>) => {
            (state.stepEditor !== action.payload) && (state.stepEditor = action.payload);
        },
        // Menu 
        stepForward: (state): void => {
            increment(state);
        },
        stepBack: (state): void => {
            decrement(state);
        }
    }
});

export const { stepForward, stepBack, setSummaryTemplate, setIngredientTemplate, setSummary, setValid, setIngredients, removeIngredient, setStepTemplate, setStepEditor, resetStepTemplate, setRecipeStep, removeStep} = recipeFormSlice.actions;
export default recipeFormSlice.reducer