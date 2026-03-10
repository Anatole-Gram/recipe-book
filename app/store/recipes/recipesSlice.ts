import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories, RequestProperty } from "../store.types";
import { fetchCategories }from "./recipesThunks";
type RecipesState = {
    categories: Categories;
    requests: {categories: RequestProperty}
};

const initialState: RecipesState = {
    categories: [],
    requests: {
        categories: {
            status: '',
            error: null
        },
    },
};


const recipesSlice = createSlice({
    name: 'recipes-sclice',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
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
    }
});


export default recipesSlice.reducer;