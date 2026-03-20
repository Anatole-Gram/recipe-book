import React from "react";
import type { ClassNamesShortInput } from "./classNames";

type SchortTextInputProps = {
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    textArea?: boolean;
    label?: string;
    placeholder?: string; 
    classNames?: ClassNamesShortInput;
}


export default function ShortTextInput(props: SchortTextInputProps) {
    
    const {name, value, handleChange, label, placeholder, textArea} = props;
    const classFor = props.classNames

    const commonProps = {
        placeholder: placeholder ? placeholder : "",
        name: name,
        value: value,
        onChange: handleChange,
        id: name,
        className: classFor?.input
    } 


    return(
        <div className={classFor?.wrapper}>

            {textArea ? <textarea {...commonProps} /> : <input {...commonProps} />}

            { label ? (<label htmlFor={name}
                        aria-label={label} 
                        className={classFor?.label}>

                        {label}

                    </label>) : null 
            }
        </div>
    )
}