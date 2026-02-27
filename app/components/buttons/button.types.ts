
export type BtnProps = {
    action: () => void;
    className?: string;
    btnText?: string;
}

type BntConditional = {
    disabled?: boolean;
}


export type BigBlackBtnRpops = BtnProps & BntConditional;

export type ArrowBtnProps =  BtnProps & { direction: 0 | 1; } & BntConditional;

export type CrossBtnProps = BtnProps & {isPlus: boolean};