import {configureStore} from '@reduxjs/toolkit';
import recipeFormReducer from './recipe/recipeFormSlice'

export const store = configureStore({
    reducer: {
        recipeForm: recipeFormReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;