import React from "react";
import styles from "./auth-form-user.module.scss";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/user/userThunks";
import { AppDispatch } from "@/store/store";
import { Link } from "react-router-dom";
import Input from "@/components/forms/form-items/common-input/CommonInput";
import { dynamicLabel } from "@/components/forms/form-items/common-input/classNames"; //classNames для Input.
import { validAuth } from "@/utils/validation/RecipeFormValidators";
import { useNavigate, useLocation } from 'react-router-dom';
import useForm from "@/hooks/useForm";


export type LoginForm = {
    login: string;
    password: string;
}
 
export default function AuthUser() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginSuccess = () => {
        const from = location.state?.from?.pathname || '/main';
        navigate(from, { replace: true });
    };

    const onSubmit = async () => {
    const payload = {log: values.login, pas: values.password};
    await dispatch(loginUser(payload)).unwrap()
        .then(() => handleLoginSuccess())
        .catch((err) => alert(err))
    };

    const { values, getFieldProps, handleSubmit, errors } = useForm<LoginForm>({
        initialValues: {login: '', password: ''},
        onSubmit: onSubmit,
        validate: validAuth
    })

    return (
        <form  onSubmit={handleSubmit}  aria-label="авторизация пользователя" className={styles.authForm}>

            <Input 
                {...getFieldProps('login')}
                label="Логин" 
                classNames={ (dynamicLabel) }/>

            <Input 
                {...getFieldProps('password')}
                type="password" 
                label="Пароль" 
                classNames={ (dynamicLabel) }/>

            <button
                type="submit"
                className={'main-btn--black'}>
                    войти
            </button>

             <Link to={`/registration`}>зарегестрироваться</Link>

        </form>
    )
}