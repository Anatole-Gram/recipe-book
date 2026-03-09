import React from "react";


type SchortTextInputProps = {
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string;
    placeholder?: string; 
    className?: string;
}


export default function ShortTextInput(props: SchortTextInputProps) {
    
    const {name, value, handleChange, label, className, placeholder} = props

    return(
        <div className={className}>

                <input 
                    placeholder={placeholder ? placeholder : ""}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    id={name}/>

{               label ? (<label htmlFor={name}
                    aria-label={label} >

                        {label}

                </label>) : null}
        </div>
    )
}