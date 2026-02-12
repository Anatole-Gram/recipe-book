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
export type RecipeIngredients = Map<string, RecipeIngredient>

export interface RecipeStep {
    id?: number;
    img: string;
    description: string;
}
export type RecipeSteps = Map<string, RecipeStep>

export type RecipeTuple = [RecipeSummary, RecipeIngredients, RecipeSteps];

export interface RecipeFormState {
    step: number;
    stepAvailable: boolean;
    recipe: RecipeTuple;
}