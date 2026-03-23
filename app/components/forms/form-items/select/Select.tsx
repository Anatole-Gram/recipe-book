import React from "react";
import styles from "./select.module.scss";
import { ClassNamesSelect } from "./classNames"
import Btn from "@/components/buttons/ButtonTemplate";
import CheckAll from "@/assets/svg/circle-check-regular.svg";
import Reset from "@/assets/svg/rotate-left-solid.svg";

type MultiSelectProps = {
    checkList: string[];
    setValue: (id: string[]) => void;
    options: {title: string, id: string}[];
    display: boolean;
    id?: string;
    // className?: string;
    classNames?: ClassNamesSelect;
    title?: string;
}

export default function Select(props: MultiSelectProps) {

    const {checkList, setValue, options, title, display, classNames} = props;


    const [allItemsId, setAllItemsId] = React.useState<string[]>([])

    React.useEffect(() => {
        const arrId = options.map((el) => el.id)
        setAllItemsId([...arrId])
    }, [])

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

    const setAll = (checked: boolean): void => {
        if (checked) {
            setValue(allItemsId)
        } else { setValue([]) }
    }


    return (
        <div className={`${classNames?.wrapper} ${display ? '' : classNames?.wrapperHide}`}>
            
            <div className={classNames?.wrapperMenu}>

                <Btn 
                    action={()=> setAll(false)}
                    className={''}>

                    <Reset className={classNames?.reset}/>

                </Btn>
                
                <Btn 
                    action={() => setAll(true)}
                    className={''}> 

                    <CheckAll className={classNames?.selectAll}/>

                </Btn>

            </div>
            <span className={classNames?.title}>{title ?? null}</span>
            {options.map(opt =>  {
                const checked = checkList.includes(opt.id)
                return (
                    <label key={opt.id} className={`${checked ?  classNames?.labelSelected : classNames?.label}`}>
                        {opt.title}
                        <input 
                        type="checkbox" 
                        id={opt.id} 
                        onChange={handleChange} 
                        className={styles.input}/>
                    </label>
                )}
            )}
        </div>
    )
}