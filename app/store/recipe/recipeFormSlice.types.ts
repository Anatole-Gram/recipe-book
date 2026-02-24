export interface RecipeSummary {
    title: string;
    img: string;
    description: string;
};

export interface RecipeIngredient {
    id?: string;
    title: string;
    count: string;
    unit: string;
};
export interface ValidTemplate {
    summary: boolean;
    ingredients: boolean;
    step: boolean;
}
export type RecipeIngredients = Record<string, RecipeIngredient>

export interface RecipeStep {
    id?: string;
    img: string;
    description: string;
}
export type RecipeSteps = Record<string, RecipeStep>

export type RecipeTuple = [RecipeSummary, RecipeIngredients, RecipeSteps];

export interface RecipeFormState {
    step: number;
    stepAvailable: boolean;
    valid: ValidTemplate;
    summaryTemplate: RecipeSummary;
    ingredientTemplate: RecipeIngredient;
    stepTemplate: RecipeStep;
    recipe: RecipeTuple;
}