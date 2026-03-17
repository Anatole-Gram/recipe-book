import React from "react";
import styles from "./auth-form-user.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import ShortInput from "@/components/forms/form-items/short-text-input/ShortTextInput";
import SubmitBtn from "@/components/buttons/BigBlackBtn";
import { LOG_REGEX, PASS_REGEX } from "@/constans/regex"
 
export default function AuthUser() {
    
    const [log, setLog] = React.useState<string>('');
    const [validLog, setValidLog] = React.useState<boolean>(false);
    React.useEffect(() => {
        setValidLog(LOG_REGEX.test(log))
    }, [log])


    const [pass, setPass] = React.useState<string>('');
    const [validPass, setValidPass] = React.useState<boolean>(false)
    React.useEffect(() => {
        setValidPass(PASS_REGEX.test(pass));
    }, [pass])

    const handleChange = (setter: (str: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => { setter(e.target.value) };


    return (
        <form action="/users/login" method="POST" aria-label="авторизация пользователя" className={styles.authForm}>

            <ShortInput name="log" value={log} handleChange={handleChange(setLog)} label="Логин" className={`${styles.inputField} recipeFormInputWraper`}/>
            <ShortInput name="pass" value={pass} handleChange={handleChange(setPass)} label="Пароль" className={`${styles.inputField} recipeFormInputWraper`}/>
            <SubmitBtn disabled={validLog && validPass} btnText="войти" action={() => {console.log('submit')}}/>
             <Link to={`/registration`}>зарегестрироваться</Link>

        </form>
    )
}