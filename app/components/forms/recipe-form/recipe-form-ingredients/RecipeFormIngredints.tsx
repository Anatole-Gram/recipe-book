import React from "react";
import styles from "./recipe-form-ingredients.module.scss"
import ShortTextInput from "../../form-items/short-text-input/ShortTextInput";


export default function RecipeFormIngredients(props: any) {


    return (
        <fieldset className={styles.ingrredientsForm}>
            <div className={styles.inputWraper}>
                <ShortTextInput label="название" value={props.data.title} handleChange={props.setData} name="title"
                    />
                
                <div className={styles.inputCountWraper}>
                    <input type="number" 
                        className={styles.inputCount}/>
                    <input type="text" 
                        className={styles.inputUnit}/>
                </div>
            </div>
            <ul className={styles.list}>
                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>
                                <li>
                    <p>наименование ингредиента<br /> 100 гр </p>
                    <button className={styles.listItemBtn}>X</button>
                </li>

            </ul>
        </fieldset>
    )
}