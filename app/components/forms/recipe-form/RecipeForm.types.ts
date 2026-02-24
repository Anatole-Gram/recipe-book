
import React from "react";


import { RecipeSummary, RecipeIngredient, RecipeStep, RecipeIngredients} from "../../../store/recipe/recipeFormSlice.types"

//RecipeFormSummaryProps
export type RecipeFormSummaryProps = {
    setDataItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: RecipeSummary
};


//Ingrediens

export type IngredientsList = RecipeIngredient[];

export interface IngredientsData {
    list: RecipeIngredients;
    item: RecipeIngredient;
    canSave: boolean;
};

    // IngredienntListItem
export type IngredientListItem  = [string, RecipeIngredient];


//props
    //RecipeIngredientList props
export type IngredientListProps = {
    list: IngredientListItem[];
}
    // RecipeFormIngredientsProps
export type RecipeIngredientsProps = {
    setDataItem: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    setDataList: () => void;
    data: IngredientsData;
};


    //RecipeFormStepProps
export type RecipeFormStepProps = {
    setDataItem: (e: any) => void;
    data: RecipeStep;
}

//RecipeFormComponent
export type RecipeFormComponent = React.ComponentType<RecipeFormSummaryProps | RecipeIngredientsProps | RecipeFormStepProps>;


export type RecipeFormProps = RecipeFormSummaryProps | RecipeIngredientsProps | RecipeFormStepProps;