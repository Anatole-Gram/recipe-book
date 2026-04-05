import React from "react";
import styles from "./singel-select.module.scss";


type SingelSelectProps = {
    values: {id: string, title: string}[];
    handleChange: (id: string) => void;
    selectedDefault?: string;
    display: boolean;
    className?:string
}

export default function SingelSelect({values, selectedDefault, handleChange, display, className}: SingelSelectProps) {

    const [selected, setSelected] = React.useState<string>(selectedDefault ?? '');
    const selectItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {id} = e.target
        setSelected(id);
        handleChange(id);
    };


    React.useEffect(() => {
        handleChange(selected)
    }, [])

    return (
        <div className={`${className ?? ''} ${display ? '' : styles.hide}`}>
            {values.map((item: {id: string, title: string}) => {
                const checked = selected === String(item.id);
                return (

                    <label 
                        key={item.id} 
                        htmlFor={item.id}> 

                            <span className={`${styles.title} ${checked ? styles.checked : ''}`}>{item.title}</span>

                            <input 
                            type="radio" 
                            value={item.id}
                            checked={checked} 
                            onChange={selectItem} 
                            id={item.id}
                            className={styles.input}/>

                    </label>
                )
            })}
        </div>
    )

}