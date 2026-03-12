//Recipes

export type Category = {id: string; title: string};
export type Categories = Category[];


//Summary
export interface RecipeSummary {
    title: string;
    categoryId: string;
    img: string;
    description: string;
};

//Ingredients
export interface RecipeIngredient {
    id?: string;
    title: string;
    count: number|string;
    unit: string;
};

export type RecipeIngredients = Record<string, RecipeIngredient>;

//steps
export interface RecipeStep {
    id?: string;
    img: string;
    description: string;
};
export type RecipeSteps = Record<string, RecipeStep>;


//Recipe validation
export interface ValidTemplate {
    summary: boolean;
    ingredients: boolean;
    step: boolean;
};

//RecipeForm State
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


export type RecipeTuple = [Partial<RecipeSummary>, RecipeIngredients, RecipeSteps];


//Recipe to submit
export type recipeDataToSubmit = {summary: RecipeSummary, ingredients: RecipeIngredient[], steps: RecipeStep[]};

//
export type RequestProperty = { status: string; error: string | null };

