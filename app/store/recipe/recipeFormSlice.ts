import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { RecipeFormState, RecipeSummary, RecipeIngredient, RecipeStep, ValidTemplate } from "@/store/store.types";
import { submitRecipe } from "./recipeFormThunks";


const initialState: RecipeFormState = {
    step: 0,
    formIsActive: false,
    stepEditor: false,
    valid: {summary: false, ingredients: false, step: false},
    summaryTemplate: {title: '', categoryId: '0', img: '', description: '', authorId: null},
    ingredientTemplate: {title: '', count: 0, unit: ''},
    stepTemplate: {description: '', img: ''},
    recipe: [{}, {}, {}],
    submitting: false,
    submitError: null,
    submittedId: null,



};

const increment = (state: RecipeFormState): void => {
    state.step += 1;
};
const decrement = (state: RecipeFormState): void => {
    state.step -= 1;
};
const newIngredient = (state: RecipeFormState): void =>  {
    state.ingredientTemplate = {title: '', count: 0, unit: ''};
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

        setFormIsActive: (state, action: PayloadAction<boolean>) => { state.formIsActive = action.payload; },

        setValid: (state, action: PayloadAction<Partial<ValidTemplate>>): void => {
            Object.assign(state.valid, action.payload)
        },

        // Summary
        setSummaryTemplate: (state, action: PayloadAction<Partial<RecipeSummary>>): void=> {
            Object.assign(state.summaryTemplate, action.payload);
        },
        setSummary: (state) => {
            console.log("+")
            if(state.valid.summary) { Object.assign(state.recipe[0], state.summaryTemplate) };
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
            if((state.stepEditor !== action.payload) ) { state.stepEditor = action.payload };
        },
        // Menu 
        stepForward: (state): void => {
            increment(state);
        },
        stepBack: (state): void => {
            decrement(state);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(submitRecipe.pending, (state) => {
            state.submitError = null;
            state.submitting = true;
        })
        .addCase(submitRecipe.fulfilled, (state, action) => {
            state.submitting = false;
            state.submittedId = action.payload.recipeId;
        })
        .addCase(submitRecipe.rejected, (state, action) => {
            state.submitting = false;
            state.submitError = action.payload || action.error?.message;
        })
  }
});

export const { setFormIsActive, stepForward, stepBack, setSummaryTemplate, setIngredientTemplate, setSummary, setValid, setIngredients, removeIngredient, setStepTemplate, setStepEditor, resetStepTemplate, setRecipeStep, removeStep} = recipeFormSlice.actions;
export default recipeFormSlice.reducer