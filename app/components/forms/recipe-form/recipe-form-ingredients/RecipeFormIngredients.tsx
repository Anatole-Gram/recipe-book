import React, { useState } from "react";
import styles from "./recipe-form-ingredients.module.scss"
import Input from "../../form-items/common-input/CommonInput";
import { dynamicLabel, ClassNamesCommonInput } from "@/components/forms/form-items/common-input/classNames"; //classNames для Ingredien.
import ClassNameExpander from "@/utils/classNames/expander"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setIngredientTemplate, removeIngredient, setIngredients} from "@/store/recipe/recipeFormSlice";
import IngredientList from "@/components/forms/form-items/interactive-list/InteractiveList";
import type {RecipeIngredient} from "@/store/store.types";
import {validateIngredient} from "@/utils/validation/RecipeFormValidators";

type RecipeIngredientsProps = {
    // ingredients: RecipeIngredients;
    // ingredient: RecipeIngredient;
    // canSave: boolean;
    // setIngredient: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
    // setIngredients: () => void;
 }

export default function RecipeFormIngredients() {

    const dispatch = useDispatch()

    ///
    const {ingredientTemplate: template} = useSelector((state: RootState) => state.recipeForm);
    const ingredients = useSelector((state: RootState) => state.recipeForm.recipe[1]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const {name, value} = e.target;
        let normolizeValue = ''
        switch(name) {
            case('count'): {
                //убираем лишние 0 в начале числа
                normolizeValue = value.replace(/^0+$/, '0').replace(/^0+(?=\d)/, '');
                break;
            }
            default: normolizeValue = value
        }
        dispatch(setIngredientTemplate({[name]: normolizeValue}));
    };

    const validIngredient = validateIngredient(template).valid;

    const addIngredient = (): void => { dispatch(setIngredients()) };

    ///




    const content = (item: RecipeIngredient): string => {
        return (
            `${item.title.slice(0, 30)}...`
        )
    };
    const remove = (id: string): void => {
        dispatch(removeIngredient(id));
    };
    
    const edite = (id: string): void => {
        dispatch(setIngredientTemplate({id: id}));
    };

    return (
        <fieldset className={styles.ingrredientsForm}>

            <div className={styles.inputWraper}>
                
                <Input 
                    label="название" 
                    name="title"
                    value={template.title} 
                    handleChange={handleChange}
                    classNames={ ClassNameExpander<ClassNamesCommonInput>('wrapper', `${styles.title}`, dynamicLabel) }/>
                
                <Input 
                    type="number"
                    label="количество"
                    name="count"
                    value={template.count}
                    handleChange={handleChange}
                    classNames={ClassNameExpander<ClassNamesCommonInput>('wrapper', `${styles.count}`, dynamicLabel) }/>

                <Input 
                    label="ед. измерения"
                    name="unit"
                    value={template.unit} 
                    handleChange={handleChange}
                    classNames={ClassNameExpander<ClassNamesCommonInput>('wrapper', `${styles.unit}`, dynamicLabel) }/>
                    
                <button
                    type="button"
                    onClick={addIngredient}
                    disabled={!validIngredient}
                    className={`${styles.btn} main-btn--black`}>
                        добавить
                </button>
            </div>

            <IngredientList<RecipeIngredient> list={Object.entries(ingredients)} contentFn={content} remove={remove} edite={edite}/>

        </fieldset>
    )
}