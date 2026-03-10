import {configureStore} from '@reduxjs/toolkit';
import recipeFormReducer from './recipe/recipeFormSlice'
import recipesReducer from "./recipes/recipesSlice";

export const store = configureStore({
    reducer: {
        recipeForm: recipeFormReducer,
        recipes: recipesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;