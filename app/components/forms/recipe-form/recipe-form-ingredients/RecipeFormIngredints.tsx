import React from "react";
import styles from "./recipe-form-ingredients.module.scss"
import ShortTextInput from "../../form-items/short-text-input/ShortTextInput";
import AddButton from "../../../buttons/bigBlackBtn";
import {RecipeIngredientsProps} from "../RecipeForm.types"


export default function RecipeFormIngredients(props: RecipeIngredientsProps | any) {

    const {list, canSave} = props.data
    const item = props.data.item[1]
    const changeItem = props.setDataItem
    const setList = props.setDataList
    return (
        <fieldset className={styles.ingrredientsForm}>
            <div className={styles.inputWraper}>
                <ShortTextInput label="название" name="title"
                    value={item.title} handleChange={changeItem}/>
                
                <label  className={styles.count}>
                    количество
                    <input type="number" name="count"
                        value={item.count} onChange={changeItem}
                        className={`${styles.inputCount} input-item`}/>
                </label>

                <label className={styles.unit}>
                    ед. измерения
                    <input type="text" name="unit"
                        value={item.unit} onChange={changeItem}
                        className={`input-item`}/>
                </label>

                <AddButton btnText='добавить' btnAction={setList} disabled={!canSave}
                    
                    />
            </div>
            <ul className={styles.list}>
                {/* {list.map((item: any) => (
                    <li key={item[0]} className={styles.listItem}>{item[1].title} <br/> {item[1].count} {item[1].unit}</li>
                    ))} */}

                    <li><div className={styles.circle}>1</div> <span>лук репчатый</span> 1 луковица</li>
                    <li><div className={styles.circle}>2</div> <span>лук репчатый</span> 1 луковица</li>
                    <li><div className={styles.circle}>3</div> <span>лук репчатый</span> 1 луковица</li>
                    <li><div className={styles.circle}>4</div> <span>лук репчатый</span> 1 луковица</li>
                    <li><div className={styles.circle}>5</div> <span>лук репчатый</span> 1 луковица</li>
                    <li><div className={styles.circle}>6</div> <span>лук репчатый</span> 1 луковица</li>
                    
            </ul>
        </fieldset>
    )
}