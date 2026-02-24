import React from "react"; 
import styles from "./recipe-form.module.scss";
import RecipeFormSummary from "./recipe-form-summary/RecipeFormSummary";
import RecipeFormIngredients from "./recipe-form-ingredients/RecipeFormIngredints";
import RecipeFormStep from "../recipe-form/recipeStep/RecipeFormStep" ;
import { RootState } from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setSummaryTemplate, setIngredientTemplate, setValid, setIngredients, setStepTemplate} from "@/store/recipe/recipeFormSlice"
import { RecipeFormComponent, RecipeFormProps } from "./RecipeForm.types";
import { validateSummary, validateIngredient, validateStep} from "@/utils/validation/RecipeFormValidators";
import { minMax } from "@/utils/base";


const COMPONENTS: RecipeFormComponent[] = [
  RecipeFormSummary, 
  RecipeFormIngredients,    
  RecipeFormStep
];

export default function RecipeForm() {

    const recipeForm = useSelector((state: RootState) => state.recipeForm);
    const dispatch = useDispatch()
    const step = recipeForm.step ;
    const recipeSteps = recipeForm.recipe[2]
 
//recipe title
    const titleList: string[] = ['новый рецепт', 'список ингредиентов', `шаг рецепта: ${step-1}`];
    
    const [formTitle, setFormTitle] = React.useState<string>('');
    React.useEffect(():void => setFormTitle(titleList[minMax(step, [0, titleList.length-1])]) , [step]);

//summary
    const summary = recipeForm.summaryTemplate;

    const handleChangeSummary = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target; 
        dispatch(setSummaryTemplate({[name]: value}))
    }, []);

    const validSummary = validateSummary(summary);
    React.useEffect(() => { dispatch(setValid({summary: validSummary.valid})); }, [validSummary]);


//ingridients
    const ingredient = recipeForm.ingredientTemplate;

    const handleChangeIngredient = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target; 
        dispatch(setIngredientTemplate({[name]: value}));
    }, []);

    const validIngredient = validateIngredient(ingredient).valid;

    const ingredientsRecord = recipeForm.recipe[1];

    const addIngredient = (): void => { dispatch(setIngredients()) };

//steps
    const recipeStep = recipeForm.stepTemplate;
    
    React.useEffect(() => {
        const stepsKeys = Object.keys(recipeSteps);
        const currenIndex = step - 2;
        if(currenIndex >= 0 && currenIndex < stepsKeys.length) {
            const current = stepsKeys[step - 2];
            dispatch(setStepTemplate({id: current, ...recipeSteps[current]}))
        }    
    }, [step])

    const handleChangeStep =  React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value, id} = e.target;
        dispatch(setStepTemplate({[name]: value}));
    }, [])

    const validStep = validateStep(recipeStep);
    React.useEffect(() => {dispatch(setValid({step: validStep.valid}))}, [recipeStep])




    React.useEffect(()=> {
        console.log(recipeForm.recipe)
    }, [recipeForm.recipe])

    const componentsProps: RecipeFormProps[] = [
        {setDataItem: handleChangeSummary, data: summary},
        {setDataItem: handleChangeIngredient, setDataList: addIngredient, data: {list: ingredientsRecord, item: ingredient, canSave: validIngredient},},
        {setDataItem: handleChangeStep, data: recipeStep}
    ];

 
    const componentByStep = (step: number, components: RecipeFormComponent[], props: RecipeFormProps[]): {component: RecipeFormComponent, props: RecipeFormProps} => {
        const index = minMax(step, [0, components.length-1]);
        const component = components[index];
        const prop = props[index];
        return {component: component, props: prop}
    }
    

    //
    const current = componentByStep(step, COMPONENTS, componentsProps);

    return(
    <form className={styles.recipeForm}>

        <h5>{ formTitle }</h5>

        {current.component ? <current.component {...current.props}/> : null}

    </form>)
}