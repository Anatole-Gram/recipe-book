import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import type {RecipeFormState, recipeDataToSubmit, RecipeSummary } from '@/store/store.types';

function buildRecipePayload(state: RecipeFormState): recipeDataToSubmit {
  return {
    summary: state.recipe[0] as RecipeSummary, 
    ingredients: Object.values(state.recipe[1]), 
    steps: Object.values(state.recipe[2])
  };
}


export const submitRecipe = createAsyncThunk<
  { recipeId: number }, 
  void,              
  { state: RootState; rejectValue: string }
>(
  'recipeForm/submit',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().recipeForm as any;
      const payload = buildRecipePayload(state);

      console.log(payload)

      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        return rejectWithValue(text || `HTTP ${res.status}`);
      }

      const data = await res.json();
      return data as { recipeId: number };
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Network error');
    }
  }
);
