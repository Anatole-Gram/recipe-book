import {configureStore} from '@reduxjs/toolkit';
import recipeFormReducer from './recipe/recipeFormSlice'
import recipesReducer from "./recipes/recipesSlice";
import userReduser from "./user/userSlice";

export const store = configureStore({
    reducer: {
        recipeForm: recipeFormReducer,
        recipes: recipesReducer,
        user: userReduser, 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;