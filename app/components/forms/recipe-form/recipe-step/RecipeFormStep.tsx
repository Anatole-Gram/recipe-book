import React from "react";
import styles from "./recipeFormStep.module.scss"
import StepPhoto from "../../form-items/photo-input/PhotoInput";
import Description from "../../form-items/long-text-input/LongTextInput";
import RmBtn from "@/components/buttons/RemoveBtn";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { removeStep } from "@/store/recipe/recipeFormSlice";
 

export default function RecipeFormStep (props: any) {

    const dispath = useDispatch();
    const {description, img, id} = props.data;
    const changeItem = props.setDataItem;
    const remove = ():void => {
        dispath(removeStep(id))
    };
    return (
        <fieldset  className={styles.formStep}>
            {id && <RmBtn action={remove} className={styles.removeBtn}/>}
            <StepPhoto className={styles.photo}/>
            <Description label="описание" name="description" value={description} handleChange={changeItem} id={id}/>
        </fieldset>
    )
}