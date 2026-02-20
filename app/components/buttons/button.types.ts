
type BtnProps = {
    disabled: boolean;
    action: () => void;
    className?: string;
}

export type BigBlackBtnRpops = BtnProps & { btnText: string; };

export type ArrowBtnProps =  BtnProps & { direction: 0 | 1; };