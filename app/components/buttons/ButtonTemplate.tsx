import React from "react";
import { BtnProps } from "./button.types";

export default function ButtonTEmplate(props: BtnProps) {
    const {className, btnText, action} = props;

    return (
        <button type="button"
            onClick={action}
            className={className ?? ''}>

                {btnText}

        </button>
    )
}