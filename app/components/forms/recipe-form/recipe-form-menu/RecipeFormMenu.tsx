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


    //получаем индек компонента
    const componentIndex = minMax(step, [0, 2]) as IsComponentIndex;

    //получаем имя копонента по индексу
    const componetn: IsComponent = COMPONENTS[componentIndex]

    const btnProps = () => {
        // получаем разрешение на действия стрелок
        const permission = {
            back: componetn !== 'summary' ? true : false,
            next: componetn === 'ingredients' ? Object.keys(recipe[1]).length > 0 : valid[componetn]
        };
        //устанавливаем состояние крестика + или х
        const isPlus = stepEditor ? valid.step : recipe.every(item => Object.keys(item).length > 0);
        //устанавливаем действия для кнопок
        const action= {
            //всегда шаг назад (если компонент крайний 'summary', то разрешения на действие ограничит permission)
            back: () => dispatch(stepBack()),
            //
            next: componetn === 'summary' ? () => dispatch(setSummary()) : () => dispatch(stepForward()),
            cross: stepEditor ? (isPlus ? addStep : closeEditor) : (isPlus ? createRecipe : resetForm)
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
        cross={{state: isPlus, action: action.cross}}
        next={{permission: permission.next, action: action.next}}
    />
    )
}