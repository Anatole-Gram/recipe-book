export interface RecipeSummary {
    title: string,
    img: string,
    description: string
};

export interface RecipeIngredient {
    title: string,
    count: string
};
export type RecipeIngredients = Map<string, RecipeIngredient>

export interface RecipeStep {
    description: string,
    img?: string
}
export type RecipeSteps = Map<string, RecipeStep>

export type RecipeTuple = [RecipeSummary, RecipeIngredients, RecipeSteps?];

export interface RecipeFormState {
    step: number,
    stepAvailable: boolean,
    summaryTemplate: RecipeSummary,
    ingridientTemplate: RecipeIngredient,
    recipeStepTemplate: RecipeStep, 
    recipe: RecipeTuple,
}