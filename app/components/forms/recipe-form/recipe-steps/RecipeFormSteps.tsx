import React from "react";
import { RecipeFormStepsProps } from "@/components/forms/recipe-form/RecipeForm.types"
import styles from "./recipe-steps.module.scss";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setStepTemplate, removeStep,  setStepEditor, resetStepTemplate} from "@/store/recipe/recipeFormSlice";
import InteractiveList from "@/components/forms/form-items/interactive-list/InteractiveList";
import AddStepBtn from "@/components/buttons/BigBlackBtn";
import RecipeStepEditor from "@/components/forms/recipe-form/recipe-steps/recipe-step/RecipeStep";


export default function(props: RecipeFormStepsProps | any) {

    const { list, item, canSave } = props.data;
    const { setDataList, setDataItem } = props;

    const dispatch = useDispatch();

    //for list item
    const content = (item: any) => {
        return `${item.description}`;
    };

    const remove = (id: string): void => {
        dispatch(removeStep(id));
    };

    const edite = (id: string): void => {
        dispatch(setStepTemplate({id: id}));
        dispatch(setStepEditor(true));
    };

    //for step ediror
    const editor = useSelector((state: RootState) => state.recipeForm.stepEditor);
    const addStep = () => {
        dispatch(resetStepTemplate());
        dispatch(setStepEditor(true));
    }

    return(
        <fieldset className={styles.stepsWraper}>
            
            { editor ? <RecipeStepEditor template={item} templateHandle={setDataItem}/> :
                <>
                    <AddStepBtn btnText="новый шаг" action={addStep}/>
                    <InteractiveList list={Object.entries(list)} contentFn={content} remove={remove} edite={edite}/>
                </>
            }

        </fieldset>
    )
}