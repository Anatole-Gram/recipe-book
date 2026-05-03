export type Img = {
    url: string;
    name?: string;
    type?: string
}

//Recipes

export type Category = {id: string; title: string};
export type Categories = Category[];


//Summary
export interface RecipeSummary {
    id?: string;
    title: string;
    categoryId: string;
    img: Img;
    description: string;
    authorId: number | null;
};
export interface RecipeSummaryToSend {
    id?: string;
    title: string;
    categoryId: string;
    img: string | null;
    description: string;
    authorId: number | null;
}  

//Ingredients
export interface RecipeIngredient {
    id?: string;
    title: string;
    count: number ;
    unit: string;
};

export type RecipeIngredients = Record<string, RecipeIngredient>;

//steps
export interface RecipeStep {
    id?: string;
    img: Img;
    description: string;
};
export interface RecipeStepToSend {
    id?: string;
    img?: string | null;
    description: string;
}

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
    formIsActive: boolean;
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
export type recipeDataToSubmit = {summary: RecipeSummaryToSend, ingredients: RecipeIngredient[], steps: RecipeStepToSend[],};

//
export type RequestProperty = { status: string; error: string | null };


interface DBRecord {
    id: number;
    createdAt: string;
    updatedAt: string;
}

interface RecipeChildren {
    recipeId: number;
    extras: null | string;
}

interface DBIngredient extends DBRecord, RecipeChildren {
    count: string;
    title: string;
    unit: string;
}
export type DBIngredients = DBIngredient[]

interface DBStep extends DBRecord, RecipeChildren {
    description: string;
    img: string;
}

export type DBSteps = DBStep[] 

export interface DBRecipe extends DBRecord {
    categoryId: number;
    description: string;
    img: string;
    title: string;
    category: {id: number, title: string};
    ingredients: DBIngredients;
    steps: DBStep[];
};

export type DBRecipes = DBRecipe[];

//user 
export type User =  {
    id: number;
    name: string;
    img: string | null;
    log: string;
    recipeIds: string[];
  }


interface UserAuth {

    auth: {
        id: number;
        log: string;
        userId: number;
    }
}
export interface DBUser  extends User, UserAuth, DBRecord {}

export interface UpdatedUser {
    id: number;
    name: string;
    img: string | null;
    updatedAt: string;
}

interface UserLogged extends User, DBRecord {}
export interface DBUserLogged {
    message: string;
    user: UserLogged;
    recipeIds: number[];
}
