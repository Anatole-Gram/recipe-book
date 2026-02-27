import React from "react";
import styles from "./recipe-form-menu.module.scss";
import ArrowBtn from "@/components/buttons/ArrowBtn";
import CrossBtn from "@/components/buttons/CrossBtn";
import { RootState } from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setSummary, setIngredients,  setRecipeStep, stepForward, stepBack, setStepEditor} from "@/store/recipe/recipeFormSlice";
import { minMax } from "@/utils/base";



export default function RecipeFormMenu(props: any) {
    const dispatch = useDispatch();
    const recipeForm = useSelector((state: RootState) => state.recipeForm);
    const {step, valid, recipe, stepEditor}  = recipeForm
    const ingredientsPermission: boolean =  Boolean(Object.keys(recipe[1]).length);






    //Действия для редактора
    const addStep = () => {
        dispatch(setRecipeStep());
        dispatch(setStepEditor(false));
    };
    const closeEditor = (): void => {
        dispatch(setStepEditor(false));
    };

    //Выбераем действие для редактора
    const editorAction = (): any => valid.step ? addStep : closeEditor;

    //Действия для формы
    const createRecipe = (): void => {console.log("Create Recipe")};
    const closeForm = (): void => {console.log("Close Form")};

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
        console.log(notEmpty)
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

    const index = minMax(step, [0, actionRecord.next.length - 1]);

    const next = actionRecord.next[index];
    const back = actionRecord.back[index];
    const cross = actionRecord.cross[index]

    return(
        <div className={styles.menu}>
            <ArrowBtn action={back.action} disabled={back.permission} direction={0} className={styles.btn }/>


            <CrossBtn action={cross.action} isPlus={crossBtnState} className={`${styles.cross} ${styles.btn}`} />


            <ArrowBtn action={next.action} disabled={next.permission} direction={1} className={styles.btn }/>
        </div>
    )
}