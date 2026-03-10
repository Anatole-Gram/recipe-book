import React from "react";
import styles from "./form-summary.module.scss"
import RecipeName from "@/components/forms/form-items/short-text-input/ShortTextInput";
import RecipePhoto from "@/components/forms/form-items/photo-input/PhotoInput";
import RecipeDescription from "@/components/forms/form-items/long-text-input/LongTextInput";
import SelectCategory from "@/components/forms/form-items/singel-select/SingelSelect";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/store/store";
import {RecipeFormSummaryProps} from "../RecipeForm.types";



export default function RecipeFormSummary(props: RecipeFormSummaryProps | any) {
    const item =props.data
    const changeItem = props.setDataItem

    const categories = useSelector((state: RootState) => state.recipes.categories);
    const [category, setCategory] = React.useState('')

    return(
        <fieldset className={styles.formSummary}>

            <RecipeName label="название" name="title" value={item.title} handleChange={changeItem}  className="recipeFormInputWraper recipeFormShortInput"/>

            <SelectCategory values={categories} handleChange={(id) => setCategory(id)}/>

            <RecipePhoto label="изображение" name="img" value={item.img} handleChange={changeItem} 
                className={styles.photo}/>
                
            <RecipeDescription label="описание" name="description" value={item.description} handleChange={changeItem} className="recipeFormInputWraper recipeFormLongInput"/>
        </fieldset>
    )
}