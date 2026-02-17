import React from "react"; 
import styles from "./recipe-form.module.scss";
import RecipeFormSummary from "./recipe-form-summary/RecipeFormSummary";
import RecipeFormIngredients from "./recipe-form-ingredients/RecipeFormIngredints";
import RecipeFormStep from "../recipe-form/recipeStep/RecipeFormStep" ;
import { RootState } from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { RecipeSummary, RecipeIngredient, RecipeStep, RecipeIngredients} from "../../../store/recipe/recipeFormSlice.types";
import { Ingredient, IngredientsList, RecipeFormComponent, RecipeFormProps } from "./RecipeForm.types";
import { validateSummary, validateIngredient, validateStep } from "../../../utils/validation/RecipeFormValidators";
import { minMax } from "../../../utils/base";


const COMPONENTS: RecipeFormComponent[] = [
  RecipeFormSummary, 
  RecipeFormIngredients,    
  RecipeFormStep
];
 

export default function RecipeForm() {

    const recipeForm = useSelector((state: RootState) => state.recipeForm);
    const dispatch = useDispatch();
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

    const [summary, setSummary] = React.useState<RecipeSummary>(structuredClone(recipeForm.recipe[0]));

    const handleChangeSummary = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target; 
        setSummary(prev => ({...prev, [name]: value}));
    }, []);

    const validSummary = React.useMemo(() => validateSummary(summary), [summary])



//ingridients

    const [ingredient, setIngredient] = React.useState<Ingredient>([`id:${Date.now()}`, {title: '', count: '', unit: ''}]);

    const handleChangeIngredient = React.useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target; 
        setIngredient(prev => ([prev[0], {...prev[1], [name]: value}]));
    }, []);

    const validIngredient = React.useMemo(() => validateIngredient(ingredient[1]).valid, [ingredient[1]])

    const [list, setList] =  React.useState<IngredientsList> ([]);
    const addIngredient = (): void => {
        setList(prev => [...prev, ingredient]);
        setIngredient([`id:${Date.now()}`, {title: '', count: '', unit: ''}]);
    };

//steps
    const [recipeStep, setRecipeStep] = React.useState<RecipeStep>({id: step, img: '', description: ''});

    const handleChangeRecipeStep = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target; setRecipeStep(prev => ({...prev, [name]: value}));
    }, []);

    const validStep = React.useMemo(() => validateStep(recipeStep), [recipeStep])




    const componentsProps: RecipeFormProps[] = [
        {setDataItem: handleChangeSummary, data: summary},
        {setDataItem: handleChangeIngredient, setDataList: addIngredient, data: {list: list, item: ingredient, canSave: validIngredient},},
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