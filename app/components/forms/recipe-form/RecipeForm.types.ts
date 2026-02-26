
import React from "react";


import { RecipeSummary, RecipeIngredient, RecipeStep, RecipeSteps, RecipeIngredients} from "../../../store/recipe/recipeFormSlice.types"

//RecipeFormSummaryProps
export type RecipeFormSummaryProps = {
    setDataItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: RecipeSummary
};


//Ingrediens

    // IngredientList
export type IngredientsList = RecipeIngredient[];

    //IngredientsData
export interface IngredientsData {
    list: RecipeIngredients;
    item: RecipeIngredient;
    canSave: boolean;
};

    // IngredienntListItem
export type IngredientListItem  = [string, RecipeIngredient];


//Steps

    //StepList
export type StepsList = RecipeStep[];
    // StepsData
export interface StepsData {
    list: RecipeSteps;
    item: RecipeStep;
    canSave: boolean;
};

    //
export type StepsListItem = [string, RecipeStep];


//IntersctiveList props

export type InteractiveListProps = {
    list: StepsListItem[];
    contentFn: (item: any) => string;
    remove: (id: string) => void;
    edite: (id: string) => void;
};


//props

    //RecipeIngredientList props
export type IngredientListProps = {
    list: IngredientListItem[];
};
    //RecipeStepsList props
export type StepsListProps = {
    list: StepsListItem[];
};

    // RecipeFormIngredientsProps
export type RecipeIngredientsProps = {
    setDataItem: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    setDataList: () => void;
    data: IngredientsData;
};


    //RecipeFormStepProps
// export type RecipeFormStepProps = {
//     setDataItem: (e: any) => void;
//     data: StepsData;
// };

    //RecipeFormStepsProps
 
export type RecipeFormStepsProps = {
    setDataItem: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setDataList: (e: any) => void;
    data: StepsData;
};

//RecipeFormComponent
export type RecipeFormComponent = React.ComponentType<RecipeFormSummaryProps | RecipeIngredientsProps | RecipeFormStepsProps>;


export type RecipeFormProps = RecipeFormSummaryProps | RecipeIngredientsProps | RecipeFormStepsProps;