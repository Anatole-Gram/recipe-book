import React from "react";
import styles from "./select.module.scss";

type MultiSelectProps = {
    checkList: string[];
    setValue: (id: string[]) => void;
    options: {title: string, id: string}[];
    display: boolean;
    id?: string;
    className?: string;
    title?: string;
}

export default function Select(props: MultiSelectProps) {

    const {id, checkList, setValue, options, title, display, className} = props;


    
    const toggleHandler = (opId: string, inpChecked: boolean) => {
        if(inpChecked) {
            if(!checkList.includes(opId)) {
                setValue([...checkList, opId])
            };
        }else setValue(checkList.filter(val => val !== opId));
     };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {checked, id} = e.target;
        toggleHandler(id, checked)
    }

    return (
        <div className={`${styles.select} ${display ? '' : styles.selectHide} ${className ?? ''}`}>
            <span>{title ?? null}</span>
            {options.map(opt =>  {
                const checked = checkList.includes(opt.id)
                return (
                    <label key={opt.id} className={`${checked ?  styles.labelChecked : ''}`}>
                        {opt.title}
                        <input type="checkbox" id={opt.id} onChange={handleChange} />
                    </label>
                )}
            )}
        </div>
    )
}