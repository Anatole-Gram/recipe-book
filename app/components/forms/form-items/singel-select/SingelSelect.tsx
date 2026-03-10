import React from "react";
import styles from "./singel-select.module.scss";


type SingelSelectProps = {
    values: {id: string, title: string}[];
    handleChange: (id: string) => void;
    className?:string
}

export default function SingelSelect(props: SingelSelectProps) {

    const {values, handleChange, className} = props;
    const [selected, setSelected] = React.useState<string>('');
    const selectItem = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const id = e.target.id
        setSelected(id);
        handleChange(id);
    };

    return (
        <div>
            {values.map((item: {id: string, title: string}) => {
                const checked = selected === String(item.id);
                return (

                    <label 
                        key={item.id} 
                        htmlFor={item.id}> 

                            <span className={`${styles.title} ${checked ? styles.checked : ''}`}>{item.title}</span>

                            <input 
                            type="radio" 
                            name='single-select' 
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