import React, { useState } from "react"; 
import styles from "./recipe-form.module.scss";
import RecipeFormSummary from "./recipe-form-summary/RecipeFormSummary";
import RecipeFormIngredients from "./recipe-form-ingredients/RecipeFormIngredints"
import RecipeFormMenu from "./recipe-form-menu/RecipeFormMenu";
import { RootState } from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setRecipeItem } from "../../../store/recipe/recipeFormSlice";
import { RecipeSummary, RecipeIngredient, RecipeStep, RecipeIngredients} from "../../../store/recipe/recipeFormSlice.types"



type StepComponentProps = {
    setData: (e: any) => void;
    data: RecipeSummary | RecipeIngredients | RecipeStep | any;
}
type StepComponent = React.ComponentType<StepComponentProps>;

interface Ingredient {
    key: string;
    title: string;
    count: string;
}

const STEP_COMPONENTS: StepComponent[] = [
  RecipeFormSummary, 
  RecipeFormIngredients,    
  RecipeFormSummary  
];



export default function RecipeForm() {

    const recipeForm = useSelector((state: RootState) => state.recipeForm)
    const dispatch = useDispatch()
    const step = recipeForm.step 
//summary
    const validSummary =(item?: RecipeSummary): boolean => {if (!item) return false; return (item?.title.length >= 5 && item?.description.length >= 0)};
    const [summary, setSummary] = React.useState(validSummary(recipeForm.recipe[0]) ? structuredClone(recipeForm.recipe[0]) : structuredClone(recipeForm.summaryTemplate));
    const handleChangeSummary = React.useCallback((e: any): void => {
        if(e===false) {
            setSummary(structuredClone(recipeForm.summaryTemplate));
            return
        }
        const {name, value} = e.target; setSummary(prev => ({...prev, [name]: value}));
    }, [recipeForm.recipe[0]]);

//ingridients
    const [ingredient, setIngredient] = React.useState({id: `id${Date.now()}`, title: 'template', count: '100г'})
    const [ingredientsList, setingredientsList] =  React.useState([ingredient])
    const handleChangeIngredient = (e: any): void => {
        const {name, value} = e.target; setIngredient(prev => ({...prev, [name]: value}))
    }
    // const handleChangeIngredientsList = (): void => {
    //     setingredientsList(prev => ([...prev, ]))
    // }

    console.log(ingredient)
    // const [ingredients, setIngredients] = React.useState(structuredClone(recipeForm.recipe[1]))
    // const [inredientsList, setIgrediantsList] = 

    // const createIngredient = (id: string = '0', ing? : Ingredient): Ingredient  => {
    //     const value = ing ?? {key: id, title: '', count: ''}
    //     return value
    // };






    const componentnByStep = () => {
        switch(true) {
            case step === 0:
                return {component: STEP_COMPONENTS[0], props: {setData: handleChangeSummary, data: summary}};
            case step === 1:
                return {component: STEP_COMPONENTS[1], props: {setData: handleChangeSummary, data: ingredientsList}};
            case step >=2: 
                return {component: STEP_COMPONENTS[2], props: {setData: handleChangeSummary, data: summary}};
            default: 
                return {component: STEP_COMPONENTS[0], props: {setData: handleChangeSummary, data: summary}};
        }

    }
    const current = componentnByStep()

    return(
    <form className={styles.recipeForm}>
        <h3>новый рецепт</h3>
        
        {current.component ? <current.component {...current.props}/> : null}

        <RecipeFormMenu />
    </form>)
}