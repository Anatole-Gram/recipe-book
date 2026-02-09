import React from "react";
import styles from "./recipe-form-ingredients.module.scss"
import ShortTextInput from "../../form-items/short-text-input/ShortTextInput";
import AddButton from "../../../buttons/bigBlackBtn";


export default function RecipeFormIngredients(props: any) {

    const {list, item} = props.data
    const setItem = props.setDataItem
    const setList = props.setDatalist

    return (
        <fieldset className={styles.ingrredientsForm}>
            <div className={styles.inputWraper}>
                <ShortTextInput label="название" name="title" 
                    value={item.title} handleChange={setItem}
                    />
                
                <div className={styles.inputCountWraper}>

                    <input type="number" name="count"
                        value={item.count} onChange={setItem}
                        className={styles.inputCount}/>

                    <input type="text" name="unit"
                        value={item.unit} onChange={setItem}
                        className={styles.inputUnit}/>

                </div>
                <AddButton btnText='добавить' btnAction={setList} />
            </div>
            <ul className={styles.list}>
                {list.map((item: any) => (
                    <li>{item.title} <br/> {item.count} {item.unit}</li>
                    ))}
            </ul>
        </fieldset>
    )
}