import React from "react";

export type BtnProps = {
    action: (param?:any) => void;
    id?: string;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    btnText?: string;
    children?: React.ReactNode; 
}

type BntConditional = {
    disabled?: boolean;
}


export type ArrowBtnProps =  BtnProps & { direction: 0 | 1; } & BntConditional;

export type CrossBtnProps = BtnProps & { isPlus: boolean };

export type ToggleBtnProps = BtnProps & BntConditional;