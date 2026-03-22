import React from "react";
import type { ClassNamesCommonInput } from "./classNames";

type SchortTextInputProps = {
    name: string;
    value: string | number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    textArea?: boolean;
    type?: string;
    label?: string;
    placeholder?: string; 
    classNames?: ClassNamesCommonInput;
}


export default function CommonInput(props: SchortTextInputProps) {
    
    const {name, value, handleChange, label, placeholder, textArea, type} = props;
    const classFor = props.classNames

    const commonProps = {
        placeholder: placeholder ? placeholder : "",
        type: type ? `${type}` : 'text',
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