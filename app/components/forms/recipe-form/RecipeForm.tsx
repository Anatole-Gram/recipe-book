import React from "react"; 
import styles from "./recipe-form.module.scss";
import RecipeFormSummary from "@/components/forms/recipe-form/recipe-form-summary/RecipeFormSummary";
import RecipeFormIngredients from "./recipe-form-ingredients/RecipeFormIngredients";
import RecipeFormSteps from "@/components/forms/recipe-form/recipe-steps/RecipeFormSteps";
import { RootState } from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setFormIsActive, setSummaryTemplate, setIngredientTemplate, setValid, setIngredients, setStepTemplate } from "@/store/recipe/recipeFormSlice";
import { validateSummary, validateIngredient, validateStep} from "@/utils/validation/RecipeFormValidators";
import { minMax } from "@/utils/base";


type StepValue = 'summary' | 'ingredients' | 'step';


export default function RecipeForm() {

    React.useEffect(() => {
        dispatch(setFormIsActive(true));
    }, [])

    React.useEffect(() => () => {
        dispatch(setFormIsActive(false));
    }, [])

    const recipeForm = useSelector((state: RootState) => state.recipeForm);
    const dispatch = useDispatch()
    const recipeSteps = recipeForm.recipe[2]

    const step = recipeForm.step ;

    const [stepValue, setStepValue]  = React.useState<StepValue>('summary');

    React.useEffect(() => {
        switch(true) {
            case(step === 0): { 
                setStepValue('summary');
                break; 
            };
            case(step === 1): { 
                setStepValue('ingredients');
                break; 
            };
            case(step >= 2): { 
                setStepValue('step');
                break; 
            }
        }
    }, [step])
 
//recipe title
    const titleList: string[] = ['новый рецепт', 'список ингредиентов', `шаги рецепта`];
    
    const [formTitle, setFormTitle] = React.useState<string>('');
    React.useEffect(():void => setFormTitle(titleList[minMax(step, [0, titleList.length-1])]) , [step]);

//summary
    const summary = recipeForm.summaryTemplate;
    //проверяем пустой ли summary в recipe, если нет устанавливаем его в шаблон
    React.useEffect(() => {
        if(Object.keys(recipeForm.recipe[0]).length) {
            dispatch(setSummaryTemplate(recipeForm.recipe[0]))
        }
    },[])

    const handleChangeSummary = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target; 
        dispatch(setSummaryTemplate({[name]: value}))
    }, []);

    const validSummary = validateSummary(summary);
    React.useEffect(() => { dispatch(setValid({summary: validSummary.valid})); console.log(validSummary) }, [validSummary]);


//ingridients
    const ingredient = recipeForm.ingredientTemplate;

    const handleChangeIngredient = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target; 
        dispatch(setIngredientTemplate({[name]: value}));
    }, []);

    const validIngredient = validateIngredient(ingredient).valid;

    const ingredientsRecord = recipeForm.recipe[1];

    const addIngredient = (): void => { dispatch(setIngredients()) };

//steps
    const recipeStep = recipeForm.stepTemplate;
    const stepsRecord = recipeForm.recipe[2];
    
    React.useEffect(() => {
        const stepsKeys = Object.keys(recipeSteps);
        const currenIndex = step - 2;
        if(currenIndex >= 0 && currenIndex < stepsKeys.length) {
            const current = stepsKeys[step - 2];
            dispatch(setStepTemplate({id: current, ...recipeSteps[current]}))
        }    
    }, [step])

    const handleChangeStep =  React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        dispatch(setStepTemplate({[name]: value}));
    }, [])

    const validStep = validateStep(recipeStep).valid;
    React.useEffect(() => {dispatch(setValid({step: validStep}))}, [recipeStep]);



    function renderStep() {
    switch (stepValue) {
        case 'summary':
        return (
            <RecipeFormSummary 
            setDataItem={handleChangeSummary} 
            summary={summary} 
            />
        );
        case 'ingredients':
        return (
            <RecipeFormIngredients
            setIngredient={handleChangeIngredient}
            setIngredients={addIngredient}
            ingredients={ingredientsRecord}
            ingredient={ingredient}
            canSave={validIngredient}
            />
        );
        case 'step':
        return (
            <RecipeFormSteps
            setStep={handleChangeStep}
            steps={stepsRecord}
            step={recipeStep}
            />
        );
    }
    }


    return(
    <form className={styles.recipeForm}>

        <h5>{ formTitle }</h5>

        {renderStep()}

    </form>)
}