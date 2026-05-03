import React from "react"; 
import styles from "./recipe-form.module.scss";
import Summary from "@/components/forms/recipe-form/recipe-form-summary/RecipeFormSummary";
import Ingredients from "./recipe-form-ingredients/RecipeFormIngredients";
import Steps from "@/components/forms/recipe-form/recipe-steps/RecipeFormSteps";
import { RootState } from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setFormIsActive } from "@/store/recipe/recipeFormSlice";
import { minMax } from "@/utils/base";


const COMPONENTS = ['summary', 'ingredients', 'steps'] as const;

type ComponentKey = typeof COMPONENTS[number];

const CONTENT: Record<ComponentKey, React.ReactElement> = {
    summary: <> <h5>Новый рецепт</h5> <Summary /> </>, 
    ingredients: <> <h5>Список ингредиентов</h5> <Ingredients /> </>, 
    steps: <> <h5>Шаги рецепта</h5>  <Steps /> </>
};


export default function RecipeForm() {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setFormIsActive(true));
    }, [])

    React.useEffect(() => () => {
        dispatch(setFormIsActive(false));
    }, []);

    const {step} = useSelector((state: RootState) => state.recipeForm) ;

    const current = React.useMemo(() => {
        const index: number = minMax(step, [0, COMPONENTS.length - 1]);
        return COMPONENTS[index];
    }, [step]);


    return(
    <form className={styles.recipeForm}>

        {CONTENT[current]}

    </form>)
}