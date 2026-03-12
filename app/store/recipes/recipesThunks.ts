import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Categories, DBRecipes } from '@/store/store.types';
import type { RootState } from '@/store/store';


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
        const data: Categories = await response.json()
            .then(data => data.map((category: {id: number, title: string}): {id:string, title: string} => ({id: String(category.id), title: category.title})));
        return data
    }
);

export const fetchRecipes = createAsyncThunk<
DBRecipes,
string,
{ state: RootState; rejectValue: string }
    >(
        'recipes/fetchRecipes',
        async (url, {getState, rejectWithValue }) => {

            try {
                const state = getState().recipes
                const res = await fetch(url)
                if(!res.ok) {
                    const text = await res.text();
                    return rejectWithValue(text || `HTTP ${res.status}`)
                }

                const data = await res.json()
                return data;

            } catch (err: any) {
                return rejectWithValue(err?.message || 'Network error');
            }
        }
    )
