import React from "react"; 
import styles from "./recipe-form.module.scss";
import RecipeFormSummary from "./recipe-form-summary/RecipeFormSummary";
import RecipeFormIngredients from "./recipe-form-ingredients/RecipeFormIngredints";
import RecipeFormStep from "../recipe-form/recipeStep/RecipeFormStep" ;
import { RootState } from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setSummaryTemplate, setIngredientTemplate, setValid, setIngredients} from "@/store/recipe/recipeFormSlice"
import { RecipeSummary, RecipeIngredient, RecipeStep, RecipeIngredients} from "@/store/recipe/recipeFormSlice.types";
import { Ingredient, IngredientsList, RecipeFormComponent, RecipeFormProps } from "./RecipeForm.types";
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

//recipe title
    const titleList: string[] = ['новый рецепт', 'список ингредиентов', 'шаг рецепта'];
    const [formTitle, setFormTitle] = React.useState<string>('');

    React.useEffect(():void => {
        if (step === 0) { setFormTitle(`${titleList[0]}`); return };
        if (step === 1) { setFormTitle(`${titleList[1]}`); return };
        setFormTitle(`${titleList[2]}: ${step - 1}`);
    }, [step]);

//summary
    const summary = recipeForm.summaryTemplate;

    const handleChangeSummary = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target; 
        dispatch(setSummaryTemplate({[name]: value}))
    }, []);

    const validSummary = React.useMemo(() => validateSummary(summary), [summary]);
    React.useEffect(() => { dispatch(setValid({summary: validSummary.valid})); }, [validSummary]);


//ingridients
    const ingredient = recipeForm.ingredientTemplate;

    const handleChangeIngredient = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target; 
        dispatch(setIngredientTemplate({[name]: value}));
    }, []);

    const validIngredient = React.useMemo(() => validateIngredient(ingredient).valid, [ingredient])

    const ingredientsRecord = recipeForm.recipe[1];

    const addIngredient = (): void => { dispatch(setIngredients()) };

//steps
    const [recipeStep, setRecipeStep] = React.useState<RecipeStep>({id: step, img: '', description: ''});

    const handleChangeRecipeStep = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target; setRecipeStep(prev => ({...prev, [name]: value}));
    }, []);

    const validStep = React.useMemo(() => validateStep(recipeStep), [recipeStep])


    React.useEffect(()=> {
        console.log(recipeForm.recipe)
    }, [recipeForm.recipe])

    const componentsProps: RecipeFormProps[] = [
        {setDataItem: handleChangeSummary, data: summary},
        {setDataItem: handleChangeIngredient, setDataList: addIngredient, data: {list: ingredientsRecord, item: ingredient, canSave: validIngredient},},
        {setDataItem: handleChangeRecipeStep, data: recipeStep}
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