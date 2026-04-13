import React from "react";
import type { RecipeStep, RecipeSteps } from "@/store/store.types";
import styles from "./recipe-steps.module.scss";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setStepTemplate, removeStep,  setStepEditor, resetStepTemplate} from "@/store/recipe/recipeFormSlice";
import InteractiveList from "@/components/forms/form-items/interactive-list/InteractiveList";
import RecipeStepEditor from "@/components/forms/recipe-form/recipe-steps/recipe-step/RecipeStep";


type RecipeFormStepsProps = {
    steps: RecipeSteps;
    step: RecipeStep;
    saveImage: (blob: Blob) => void;
    setStep: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function RecipeFormStep ({ steps, step, setStep, saveImage }: RecipeFormStepsProps ) {

    const dispatch = useDispatch();

    //for list item
    const content = (item: RecipeStep) => {
        return `${item.description.slice(0, 30)}...`;
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
    const addStep = (): void => {
        dispatch(resetStepTemplate());
        dispatch(setStepEditor(true));
    }

    return(
        <fieldset className={styles.stepsWraper}>
            
            { editor ? <RecipeStepEditor step={step} handleChange={setStep} saveImage={saveImage}/> :
                <>
                    <button
                        onClick={addStep}
                        className="main-btn--black">
                            новый шаг    
                    </button>
                    
                    <InteractiveList<RecipeStep> list={Object.entries(steps)} contentFn={content} remove={remove} edite={edite}/>
                </>
            }

        </fieldset>
    )
}