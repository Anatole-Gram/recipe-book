import React from "react";
import styles from "./auth-form-user.module.scss";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/user/userThunks";
import { AppDispatch } from "@/store/store";
import { Link } from "react-router-dom";
import Input from "@/components/forms/form-items/common-input/CommonInput";
import { dynamicLabel } from "@/components/forms/form-items/common-input/classNames"; //classNames для Input.
import SubmitBtn from "@/components/buttons/BigBlackBtn";
import { LOG_REGEX, PASS_REGEX } from "@/constans/regex"
import { useNavigate, useLocation } from 'react-router-dom';
 
export default function AuthUser() {

    const dispatch = useDispatch<AppDispatch>()
    
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

    const handleChange = (setter: (str: string) => void) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => { setter(e.target.value) };

    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginSuccess = () => {
        const from = location.state?.from?.pathname || '/main';
        navigate(from, { replace: true });
    };

        const login = async () => {
        const payload = {log: log, pas: pass};
        await dispatch(loginUser(payload)).unwrap()
            .then(() => handleLoginSuccess())
    }

    return (
        <form action="/users/login" method="POST" aria-label="авторизация пользователя" className={styles.authForm}>

            <Input 
                name="log" 
                value={log}
                handleChange={handleChange(setLog)} 
                label="Логин" 
                classNames={ (dynamicLabel) }/>

            <Input 
                name="pass" 
                value={pass}
                type="password" 
                handleChange={handleChange(setPass)} 
                label="Пароль" 
                classNames={ (dynamicLabel) }/>

            <SubmitBtn 
                disabled={validLog && validPass} 
                btnText="войти" 
                action={login}/>

             <Link to={`/registration`}>зарегестрироваться</Link>

        </form>
    )
}