import React from "react";
import styles from "./recipe-form-menu.module.scss"
import ArrowLeft from "@/assets/svg/left-arrow.svg"
import ArrowRight from "@/assets/svg/right-arrow.svg"
import AddOrClose from "@/assets/svg/close-x.svg"
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/store/recipe/recipeFormSlice";


export default function RecipeFormMenu(props) {
    const dispatch = useDispatch();

    return(
        <div className={styles.menu}>
            <ArrowLeft width={40} height={40}
                onClick={()=> dispatch(decrement())}
                className={`${styles.menuBtn} ${props.leftIsActive ? styles.menuBtnActive : ""}`}/>

            <AddOrClose width={40} height={40}  
                className={`${styles.menuBtn} ${props.addIsActive ? styles.menuBtnAdd : styles.menuBtnClose}`}/>

            <ArrowRight width={40} height={40}
                onClick={()=> dispatch(increment())} 
                className={`${styles.menuBtn} ${props.rigthIsActive ? styles.menuBtnActive : ""}`}/>
        </div>
    )
}