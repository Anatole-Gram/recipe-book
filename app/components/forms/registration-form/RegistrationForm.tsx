import React from "react";
import styles from "./registration-form.module.scss"
import ShortInput from "@/components/forms/form-items/short-text-input/ShortTextInput";
import SubmitBtn from "@/components/buttons/BigBlackBtn";
import { LOG_REGEX, PASS_REGEX } from "@/constans/regex";
import { submitUser } from "@/store/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";


export default function RegistrationForm() {

    const dispatch = useDispatch<AppDispatch>()
   
    const navigate = useNavigate()
    const isAuth = useSelector((state: RootState) => state.user);
    React.useEffect(() => {
        if(isAuth) {
            navigate('/main', {replace: true})
        }
    }, [isAuth])


    const [name, setName] = React.useState<string>('')
    const [validName, setValidName] = React.useState<boolean>(false)
    React.useEffect(() => {
        setValidName(LOG_REGEX.test(name))
    }, [name])

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


    const submitData = () => {
        const body = {
            name: name,
            log: log,
            pas: pass,
            img: ""
        };
        dispatch(submitUser(body))
    }

    const handleChange = (setter: (str: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => { setter(e.target.value) };

    return (
        <form action="/users" method="POST" aria-label="форма регистрации нового пользователя" className={styles.regForm}>
            <ShortInput name="name" value={name} handleChange={handleChange(setName)} label="Имя" className={`${styles.inputField} recipeFormInputWraper`}/>
            <ShortInput name="log" value={log} handleChange={handleChange(setLog)} label="Логин" className={`${styles.inputField} recipeFormInputWraper`}/>
            <ShortInput name="pass" value={pass} handleChange={handleChange(setPass)} label="Пароль" className={`${styles.inputField} recipeFormInputWraper`}/>
            <SubmitBtn disabled={validLog && validPass && validName} btnText="Зарегистроваться" action={submitData}/>
            
        </form>
    )
}