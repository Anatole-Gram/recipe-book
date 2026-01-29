import React from "react";
import styles from "./form-summary.module.scss"
import ShortTextInput from "../../form-items/short-text-input/ShortTextInput";
import PhotoInput from "../../form-items/photo-input/PhotoInput";
import LongTextInput from "../../form-items/long-text-input/LongTextInput";


export default function RecipeFormSummary(props) {
    const [summary, setSummary] = React.useState({
        title: "",
        img: "https://placehold.jp/200x150.png",
        description: "",
    });
    const [valid, setValid] = React.useState(false)
    React.useEffect(()=>{
        const isTitleValid = summary.title.length > 2;
        const isImgValid = true;
        const isDescriptionValid = summary.description.length > 10;
        ((isTitleValid && isImgValid && isDescriptionValid) !== valid) && setValid(!valid)
     }, [summary])
    React.useEffect(() => {
        props.setRecipe(prev => ({...prev, summary: summary}))
        console.log(valid)
    }, [valid])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSummary((prev) => ({...prev, [name]: value}));
    }
    return(
        <fieldset className={styles.formTitle}>
            <ShortTextInput label="название" value={summary.title} handleChange={handleChange} name="title"/>
            <PhotoInput label="изображение" value={summary.img} handleChange={handleChange} name="img"/>
            <LongTextInput label="описание" value={summary.description} handleChange={handleChange} name="description"/>
        </fieldset>
    )
}