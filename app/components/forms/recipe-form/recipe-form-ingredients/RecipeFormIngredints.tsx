import React from "react";
import styles from "./recipe-form-ingredients.module.scss"
import ShortTextInput from "../../form-items/short-text-input/ShortTextInput";


export default function RecipeFormIngredients(props: any) {


    return (
        <fieldset>
            <ShortTextInput label="название" value={props.data.title} handleChange={props.setData} name="title"/>
            <ShortTextInput label="количество" value={props.data.count} handleChange={props.setData} name="count"/>
            <ul>
                {props.data.map((item: any) => (
                    <li key={item.id}>{item.title}: <br/>{item.count} </li>))}
            </ul>
            {/* <ShortTextInput label="название" value={props.data.title} handleChange={props.setData} name="title"/>
            <ShortTextInput label="количество" value={props.data.count} handleChange={props.setData} name="count"/> */}
        </fieldset>
    )
}