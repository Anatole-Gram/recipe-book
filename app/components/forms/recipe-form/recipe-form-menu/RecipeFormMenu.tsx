import React from "react";
import MenuPanel from "@/components/footer/footer-menu/FooterMenu"; 
import { RootState, AppDispatch} from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setSummary, setIngredients,  setRecipeStep, stepForward, stepBack, setStepEditor} from "@/store/recipe/recipeFormSlice";
import { submitRecipe } from "@/store/recipe/recipeFormThunks";
import { minMax } from "@/utils/base";



export default function RecipeFormMenu() {
    const dispatch = useDispatch<AppDispatch>();
    const recipeForm = useSelector((state: RootState) => state.recipeForm);
    const user = useSelector((state: RootState) => state.user.data)
    const {step, valid, recipe, stepEditor}  = recipeForm;
    const ingredientsPermission: boolean =  Boolean(Object.keys(recipe[1]).length);


    //Действия для редактора
    const addStep = () => {
        dispatch(setRecipeStep());
        dispatch(setStepEditor(false));
    };
    const closeEditor = (): void => {
       console.log('close')
    };

    //Выбераем действие для редактора
    const editorAction = (): any => valid.step ? addStep : closeEditor;

    //Действия для формы
    const createRecipe = (): void => {
        dispatch(submitRecipe(user.id));
    };
    const closeForm = async (): Promise<any> => {
        console.log('close form')
    };

    //Устанавливаем состоение для выбора действия формы
    const [canCreate, setCanCreate] = React.useState<boolean>(false);

    //Меняем условие для выбора формы
    //true - все елементы recipe не пустые
    //false - recipe имеет пустой объект
    React.useEffect(() => {
        const notEmpty = new Set()
        for(let i = 0; i < recipe.length; i++ ) {
            notEmpty.add(Boolean(Object.keys(recipe[i]).length));
        };
        setCanCreate(!notEmpty.has(false));
    }, [recipe]);

    //Выбераем действие для формы
    const formAction = (): any => canCreate && !stepEditor ? createRecipe : closeForm;

    //Устанавливыаем состояние для изменения стилей кнопки CrossBtn
    //Меняем состояние отслеживая  stepEditor, valid.step и canCreate
    const [crossBtnState, setCrossBtnState] = React.useState<boolean>(false)
    React.useEffect(() => {
        if(!stepEditor) {setCrossBtnState(canCreate)};
        if(stepEditor) {setCrossBtnState(valid.step)};
    }, [stepEditor, valid.step, canCreate]);


    const actionRecord = {
        next: [
            {permission: valid.summary, action: () => dispatch(setSummary())},
            {permission: ingredientsPermission, action: () => dispatch(stepForward())},
            {permission: valid.step, action: () => dispatch(setRecipeStep())},
        ],
        back: [
            {permission: step > 0, action: () => dispatch(stepBack())},
            {permission: true, action: () => dispatch(stepBack())},
            {permission: true, action: () => dispatch(stepBack())},
        ], 
        cross: [
            {action: stepEditor ? editorAction() : formAction() },
            {action: stepEditor ? editorAction() : formAction() },
            {action: stepEditor ? editorAction() : formAction() },
        ]
    };

    React.useEffect(() => {
        console.log(valid.summary)
    })

    const index = minMax(step, [0, actionRecord.next.length - 1]);

    const next = actionRecord.next[index];
    const back = actionRecord.back[index];
    const cross = actionRecord.cross[index]

    return(

        <MenuPanel 
            back={{ action: back.action, permission: back.permission }}
            cross={{ action: cross.action, state: crossBtnState }}
            next={{ action: next.action, permission: next.permission }}
        />
    )
}