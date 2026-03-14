import React from "react";
import styles from "./recipe-steps.module.scss";
import type { DBSteps } from "@/store/store.types";
import imgStub from "@/assets/images/recipe-img-stub.png";

type RecipeStepsProps = {
    list: DBSteps;
    className?: string;
}


export default function RecipeSteps(props: RecipeStepsProps) {

    const {list, className} = props;

    return (
        <div className={ `${styles.steps} ${className ?? ""}` }>
            <h5 className={ styles.stepsTitle }> шаги рецепта </h5>
            {list.map(item => {
                const { id, description, img } = item;
                return (
                    <div key={id} className={ `${styles.step} recipeCard` }>
                        <img src={ imgStub } alt="stpe photo" width={100} height={100} className={ styles.stepImg }/>
                        <p className={ styles.stepDescription }> { description } </p>
                    </div>
                )
            })}
        </div>
    )
} 