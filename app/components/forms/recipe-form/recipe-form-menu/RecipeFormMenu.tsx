import React from "react";
import MenuPanel from "@/components/footer/footer-menu/FooterMenu"; 
import { RootState, AppDispatch} from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setSummary,  setRecipeStep, stepForward, stepBack, setStepEditor, resetSlice, setFormIsActive, resetStepTemplate} from "@/store/recipe/recipeFormSlice";
import { submitRecipe } from "@/store/recipe/recipeFormThunks";
import { minMax } from "@/utils/base";

type IsComponent = 'summary' | 'ingredients' | 'step';
type IsComponentIndex = 0 | 1 | 2;

const COMPONENTS: IsComponent[] = ['summary', 'ingredients', 'step'] as const;



export default function RecipeFormMenu() {
    const dispatch = useDispatch<AppDispatch>();
    const recipeForm = useSelector((state: RootState) => state.recipeForm);
    const user = useSelector((state: RootState) => state.user.data)
    const {step, valid, recipe, stepEditor}  = recipeForm;



    //Действия для редактора
    const addStep = () => {
        dispatch(setRecipeStep());
        dispatch(setStepEditor(false));
    };
    const closeEditor = (): void => {
       dispatch(setStepEditor(false));
       dispatch(resetStepTemplate());
    };

    //Действия для формы
    const createRecipe = (): void => {
        dispatch(submitRecipe(user.id));
    };
    const resetForm = (): void => {
        dispatch(resetSlice())
        dispatch(setFormIsActive(true))
    };

    const componentIndex = minMax(step, [0, 2]) as IsComponentIndex;

    const component: IsComponent = COMPONENTS[componentIndex]

    const btnProps = () => {

        const permission = {
            back: (component === 'summary') || stepEditor ? false : true,
            next:  component === 'ingredients' ? Object.keys(recipe[1]).length > 0 : (component === 'summary' ? valid[component] : false),
            cross: stepEditor || recipe.every(item => Object.keys(item).length > 0),
        };


        const isPlus = stepEditor ? valid.step : recipe.every(item => Object.keys(item).length > 0);


        const action= {
            back: () => dispatch(stepBack()),
            next: component === 'summary' ? () => dispatch(setSummary()) : () => dispatch(stepForward()),
            cross: stepEditor ? (isPlus ? addStep : closeEditor) : createRecipe,
            reset: stepEditor ? () => dispatch(resetStepTemplate()) : resetForm
        };
        
        return ({
            permission: {...permission},
            action: {...action},
            isPlus
        });
    };

    const {permission, isPlus, action} = btnProps()

    return(
    <MenuPanel
        back={{permission: permission.back, action: action.back}}
        reset={{permission: true, action: action.reset}}
        cross={{isPlus, action: action.cross, permission: permission.cross}}
        next={{permission: permission.next, action: action.next}}
    />
    )
}