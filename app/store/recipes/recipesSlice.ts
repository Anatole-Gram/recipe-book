import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories, RequestProperty, DBRecipes } from "../store.types";
import { fetchCategories, fetchRecipes }from "./recipesThunks";

type RecipesState = {
    recipeIsActive: boolean;
    recipeSectionId: string [];
    categories: Categories;
    list: DBRecipes;
    requests: {categories: RequestProperty, recipes: RequestProperty}
};

const initialState: RecipesState = {
    recipeIsActive: false,
    recipeSectionId: [],
    categories: [],
    list: [],
    requests: {
        categories: {
            status: '',
            error: null
        },
        recipes: {
            status: '',
            error: null
        }
    }
};


const recipesSlice = createSlice({
    name: 'recipes-sclice',
    initialState,
    reducers: {
        setRecipeIsActive: (state, action: PayloadAction<boolean>) => {
            state.recipeIsActive = action.payload;
        },
        setrecipeSectionId: (state, action: PayloadAction<string[]>) => { 
            state.recipeSectionId = action.payload; 
        },
    },

    extraReducers: (builder) => {
        builder
        //fetchCategories
        .addCase(fetchCategories.pending, (state) => {
            state.requests.categories.status = 'loading';
            state.requests.categories.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Categories>) => {
            state.requests.categories.status = 'succeeded';
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.requests.categories.status = 'failed';
            state.requests.categories.error = (action.payload as string) ?? action.error?.message ?? 'Unknown error';
        })
        //fetchRecipes
        .addCase(fetchRecipes.pending, (state) => {
            state.requests.recipes.status = 'loading recipes';
            state.requests.recipes.error = null;
        })
        .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<DBRecipes>) => {
            state.requests.recipes.status = 'succeeded';
            state.list = action.payload;
        })
        .addCase(fetchRecipes.rejected, (state, action) => {
            state.requests.recipes.status = 'failed';
            state.requests.recipes.error = (action.payload as string) ?? action.error?.message ?? 'Unknown error';
        })
    }
});

export const { setRecipeIsActive, setrecipeSectionId } = recipesSlice.actions;
export default recipesSlice.reducer;