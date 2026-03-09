import React from "react";



export default function LongTextInput(props) {
    const {label, value, name, id,handleChange, className} = props
    return(
        <div className={className}>

            <textarea 
                aria-label={label}
                placeholder=""
                value={value}
                name={name}
                onChange={handleChange}
                id={id??0}>
            </textarea> 
            
            <label 
                htmlFor={name}>
                    {label}
            </label>
        </div>
    );
};