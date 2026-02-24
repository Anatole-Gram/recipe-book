
export type BtnProps = {
    action: () => void;
    className?: string;
}

type BntConditional = {
    disabled: boolean;
}


export type BigBlackBtnRpops = BtnProps & { btnText: string; } & BntConditional;

export type ArrowBtnProps =  BtnProps & { direction: 0 | 1; } & BntConditional;

