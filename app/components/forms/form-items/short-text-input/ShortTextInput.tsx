import React from "react";


type SchortTextInputProps = {
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label: string;
    className?: string;
}


export default function ShortTextInput(props: SchortTextInputProps) {
    
    const {name, value, handleChange, label, className} = props

    return(
        <div className={className}>

                <input 
                    placeholder=''
                    name={name}
                    value={value}
                    onChange={handleChange}
                    id={name}/>

                <label htmlFor={name} 
                    aria-label={label} >

                        {label}

                </label>
        </div>
    )
}