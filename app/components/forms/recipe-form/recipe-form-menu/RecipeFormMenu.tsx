import React from "react";
import styles from "./recipe-form-menu.module.scss";
import ArrowBtn from "@/components/buttons/ArrowBtn";
import ArrowRight from "@/assets/svg/right-arrow.svg";
import AddOrClose from "@/assets/svg/close-x.svg"
import { RootState } from "app/store/store";
import { useSelector, useDispatch } from "react-redux";
import { setSummary, setIngredients,  setRecipeStep} from "@/store/recipe/recipeFormSlice";
import { minMax } from "@/utils/base";



export default function RecipeFormMenu(props: any) {
    const dispatch = useDispatch();
    const recipeForm = useSelector((state: RootState) => state.recipeForm);
    const {step, valid} =recipeForm

    const actionRecord = {
        next: [
            {permission: valid.summary ,action: () => dispatch(setSummary())},
            {permission: valid.ingredients, action: () => dispatch(setIngredients())},
            {permission: valid.step, action: () => dispatch(setRecipeStep())},
        ],
        back: [
            {permission: false, action: () => dispatch(setSummary())},
            {permission: false, action: () => dispatch(setSummary())},
            {permission: false, action: () => dispatch(setSummary())},
        ]
    };

    const index = minMax(step, [0, actionRecord.next.length]);
    const next = actionRecord.next[index];
    const back = actionRecord.back[index];

    return(
        <div className={styles.menu}>
            <ArrowBtn action={back.action} disabled={back.permission} direction={0} className={styles.btn }/>

            <AddOrClose width={40} height={40}  
                className={`${styles.menuBtn} ${props.addIsActive ? styles.menuBtnAdd : styles.menuBtnClose}`}/>

            <ArrowBtn action={next.action} disabled={next.permission} direction={1} className={styles.btn }/>
        </div>
    )
}