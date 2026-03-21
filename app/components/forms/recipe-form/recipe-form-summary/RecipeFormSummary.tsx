import React from "react";
import styles from "./form-summary.module.scss"
import InputComponent from "@/components/forms/form-items/short-text-input/ShortTextInput";
import { dynamicLabel, ClassNamesShortInput } from "@/components/forms/form-items/short-text-input/classNames"; //classNames для InputComponent.
import RecipePhoto from "@/components/forms/form-items/photo-input/PhotoInput";
import { smallColumn } from "@/components/forms/form-items/photo-input/classNames"; ////classNames для RecipePhoto
import Categories from "@/components/forms/recipe-form/recipe-categories/RecipeCategories";
import type { RecipeSummary } from "@/store/store.types"
import classNamesExpander from "@/utils/classNames/expander";


export type  RecipeFormSummaryProps = {
    setDataItem: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    summary: RecipeSummary;
};


export default function RecipeFormSummary(props: RecipeFormSummaryProps | any) {
    const { title, img, description } = props.summary;
    const changeItem = props.setDataItem

    return(
        <fieldset className={styles.formSummary}>

            <InputComponent 
                label="название" 
                name="title" 
                value={title} 
                handleChange={changeItem} 
                classNames={ dynamicLabel }
            />
            
            <div className={styles.centralWraper}>

                <Categories className={styles.categories}/>

                <RecipePhoto 
                    label="Загрузить" 
                    title="изображение блюда"
                    name="img" 
                    value={img} 
                    handleChange={changeItem} 
                    classNames={smallColumn} />

            </div>

            <InputComponent 
                label="описание" 
                name="description" 
                value={description} 
                handleChange={changeItem} 
                textArea={true} 
                classNames={classNamesExpander<ClassNamesShortInput>('input', 'description', dynamicLabel)} />

        </fieldset>
    )
}