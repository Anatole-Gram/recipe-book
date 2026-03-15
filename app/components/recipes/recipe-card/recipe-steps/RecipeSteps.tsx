import React from "react";
import styles from "./recipe-steps.module.scss";
import { useDispatch } from "react-redux";
import { setrecipeSectionId } from "@/store/recipes/recipesSlice";
import type { DBSteps } from "@/store/store.types";
import imgStub from "@/assets/images/recipe-img-stub.png";

type RecipeStepsProps = {
    list: DBSteps;
    className?: string;
}


export default function RecipeSteps(props: RecipeStepsProps) {
    const dispatch = useDispatch();

    const {list, className} = props;
    const idList: string[] = []

    React.useEffect(() => {
        dispatch(setrecipeSectionId(idList))
    }, [])

    return (
        <div className={ `${styles.steps} ${className ?? ""}` }>
            <h5 className={ styles.stepsTitle }> шаги рецепта </h5>
            {list.map(item => {
                const { description, img } = item;
                const id = `step-${item.id}`
                idList.push(id)
                return (
                    <div key={id} id={id} className={ `${styles.step} recipeCard` }>
                        <img src={ imgStub } alt="stpe photo" width={100} height={100} className={ styles.stepImg }/>
                        <p className={ styles.stepDescription }> { description } </p>
                    </div>
                )
            })}
        </div>
    )
} 