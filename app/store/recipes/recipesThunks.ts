import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Categories } from '../store.types';


export const fetchCategories = createAsyncThunk<
Categories,
void,
{rejectValue: string}
> (
    'recipes/fetchCategories',
    async (_, {rejectWithValue}) => {
        const response = await fetch('/api/categories');
        if(!response.ok) {
            return rejectWithValue('Failed to fetch categories.');
        };
        const data: Categories = await response.json();
        return data 
    }
);