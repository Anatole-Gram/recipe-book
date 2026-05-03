import React from "react";
import type {RecipeStep} from "@/store/store.types";
import styles from "./recipe-steps.module.scss";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setStepTemplate, setValid, removeStep,  setStepEditor, resetStepTemplate} from "@/store/recipe/recipeFormSlice";
import InteractiveList from "@/components/forms/form-items/interactive-list/InteractiveList";
import RecipeStepEditor from "@/components/forms/recipe-form/recipe-steps/recipe-step/RecipeStep";
import {validateStep} from "@/utils/validation/RecipeFormValidators";



export default function RecipeFormStep () {

    const dispatch = useDispatch();

    const {stepTemplate: template, stepEditor: editor, step} = useSelector((state: RootState) => state.recipeForm);
    const steps = useSelector((state: RootState) => state.recipeForm.recipe[2]);

    const handleChange =  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        dispatch(setStepTemplate({[name]: value}));
    };


    React.useEffect(() => {
        const stepsKeys = Object.keys(steps);
        const currenIndex = step - 2;
        if(currenIndex >= 0 && currenIndex < stepsKeys.length) {
            const current = stepsKeys[step - 2];
            dispatch(setStepTemplate({id: current, ...steps[current]}))
        }    
    }, [step])

    const validStep = validateStep(template).valid;
    React.useEffect(() => {dispatch(setValid({step: validStep}))}, [template]);

    //for list item
    const content = (item: RecipeStep) => {
        const text = item.description
        return text.length > 30 ? `${text.slice(0, 30)}...` : text;
    };

    const remove = (id: string): void => {
        dispatch(removeStep(id));
    };

    const edite = (id: string): void => {
        dispatch(setStepTemplate({id: id}));
        dispatch(setStepEditor(true));
    };

    //for step ediror

    const addStep = (): void => {
        dispatch(resetStepTemplate());
        dispatch(setStepEditor(true));
    }

    return(
        <fieldset className={styles.stepsWraper}>
            
            { editor ? <RecipeStepEditor recipeStep={template} numberStep={step} handleChange={handleChange} /> :
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