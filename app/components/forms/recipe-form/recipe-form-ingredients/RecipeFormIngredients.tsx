import React from "react";
import styles from "./recipe-form-ingredients.module.scss"
import Input from "../../form-items/common-input/CommonInput";
import { dynamicLabel, ClassNamesCommonInput } from "@/components/forms/form-items/common-input/classNames"; //classNames для Ingredien.
import ClassNameExpander from "@/utils/classNames/expander"
import AddButton from "@/components/buttons/BigBlackBtn";
import { useDispatch } from "react-redux";
import { setIngredientTemplate, removeIngredient } from "@/store/recipe/recipeFormSlice";
import IngredientList from "@/components/forms/form-items/interactive-list/InteractiveList";
import type { RecipeIngredients, RecipeIngredient } from "@/store/store.types";

type RecipeIngredientsProps = {
    ingredients: RecipeIngredients;
    ingredient: RecipeIngredient;
    canSave: boolean;
    setIngredient: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
    setIngredients: () => void;
 }

export default function RecipeFormIngredients(props: RecipeIngredientsProps) {

    const {ingredients, ingredient, canSave, setIngredient, setIngredients} = props;

    const dispatch = useDispatch()

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
                    value={ingredient.title} 
                    handleChange={setIngredient}
                    classNames={ ClassNameExpander<ClassNamesCommonInput>('wrapper', 'ingredients_input-name', dynamicLabel) }/>
                
                <Input 
                    type="number"
                    label="количество"
                    name="count"
                    value={ingredient.count}
                    handleChange={setIngredient}
                    classNames={ClassNameExpander<ClassNamesCommonInput>('wrapper', 'ingredients_input-count', dynamicLabel) }/>

                <Input 
                    label="ед. измерения"
                    name="unit"
                    value={ingredient.unit} 
                    handleChange={setIngredient}
                    classNames={ClassNameExpander<ClassNamesCommonInput>('wrapper', 'ingredients_input-unit', dynamicLabel) }/>
                    
                <AddButton 
                    btnText='добавить' 
                    action={setIngredients} 
                    disabled={!canSave}
                    className={styles.inputBtn} />
            </div>

            <IngredientList<RecipeIngredient> list={Object.entries(ingredients)} contentFn={content} remove={remove} edite={edite}/>

        </fieldset>
    )
}