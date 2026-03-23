import React from "react";
import { BtnProps } from "./button.types";



export default function ButtonTemplate(props: BtnProps) {
    const {id, className, btnText, action, children} = props;

    return (
        <button type="button"
            onClick={action}
            id={id ?? Date.now().toString()}
            className={className}>

                {btnText}
                {children ?? null}

        </button>
    )
}