export interface RecipeSummary {
    title: string;
    categoryId: string;
    img: string;
    description: string;
};

export interface RecipeIngredient {
    id?: string;
    title: string;
    count: number|string;
    unit: string;
};
export interface ValidTemplate {
    summary: boolean;
    ingredients: boolean;
    step: boolean;
};
export type RecipeIngredients = Record<string, RecipeIngredient>;

export interface RecipeStep {
    id?: string;
    img: string;
    description: string;
};
export type RecipeSteps = Record<string, RecipeStep>;

export type RecipeTuple = [Partial<RecipeSummary>, RecipeIngredients, RecipeSteps];

export interface RecipeFormState {
    step: number;
    stepEditor: boolean;
    valid: ValidTemplate;
    summaryTemplate: RecipeSummary;
    ingredientTemplate: RecipeIngredient;
    stepTemplate: RecipeStep;
    recipe: RecipeTuple;
    submitting: boolean;
    submitError?: string|null;
    submittedId: number|null;
};

export type recipeDataToSubmit = {summary: RecipeSummary, ingredients: RecipeIngredient[], steps: RecipeStep[]};