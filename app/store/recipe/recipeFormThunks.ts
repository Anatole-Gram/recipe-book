import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBlob, hasBlob } from '@/utils/cache/blobCache';
import type { RootState } from '@/store/store';
import type {RecipeFormState, recipeDataToSubmit, RecipeSummaryToSend, RecipeStepToSend} from '@/store/store.types';



async function buildRecipePayload(state: RecipeFormState): Promise<recipeDataToSubmit> {

  const loadedImgs = new Map();
  const formData = new FormData();
  const summary = state.recipe[0]
  const steps = Object.values(state.recipe[2]);


  [summary, ...steps].forEach(el => {
    if(el.id && hasBlob(el.id)) {
      formData.append('files', getBlob(el.id) as Blob, el.id );
    };
  });

  const res = await fetch(`/api//upload/images`, {
    method: 'POST',
    body: formData
  })
    .then(data => data.json())
    .then((urlsData: [id:string, url:string][]) => {urlsData.forEach(el => loadedImgs.set(...el))});

  console.log(loadedImgs)

  const summaryToSend = {
      title: summary.title,
      categoryId: summary.categoryId,
      img: loadedImgs.get('summary'),
      description: summary.description,
      authorId: null
    } as RecipeSummaryToSend

  const stepsToSend: RecipeStepToSend[] = steps.map((step) => ({description: step.description, img: loadedImgs.get(step.id)}));

    console.log(summaryToSend)

  return {
    summary: summaryToSend,
    ingredients: Object.values(state.recipe[1]), 
    steps: stepsToSend
  };
}


export const submitRecipe = createAsyncThunk<
  { recipeId: number }, 
  number,              
  { state: RootState; rejectValue: string }
>(
  'recipeForm/submit',
  async (authorId, { getState, rejectWithValue }) => {
    try {
      const state = getState().recipeForm as any;
      const payload = await buildRecipePayload(state);
      payload.summary.authorId = authorId

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
