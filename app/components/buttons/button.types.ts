import React from "react";

export type BtnProps = {
    action: (param?:any) => void;
    className?: string;
    btnText?: string;
}

type BntConditional = {
    disabled?: boolean;
}


export type BigBlackBtnRpops = BtnProps & BntConditional;

export type ArrowBtnProps =  BtnProps & { direction: 0 | 1; } & BntConditional;

export type CrossBtnProps = BtnProps & { isPlus: boolean };

export type ToggleBtnProps = BtnProps & BntConditional;