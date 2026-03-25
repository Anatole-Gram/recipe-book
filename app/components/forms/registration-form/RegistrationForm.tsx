import React from "react";
import styles from "./registration-form.module.scss"
import Input from "@/components/forms/form-items/common-input/CommonInput";
import { dynamicLabel } from "@/components/forms/form-items/common-input/classNames"; //classNames для RecipeName.
import { submitUser } from "@/store/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import type { LoginForm } from "@/components/forms/auth-form/AuthFormUser";
import useForm from "@/hooks/useForm";
import { validRegestration } from "@/utils/validation/RecipeFormValidators";


export type RegestrationFormType = LoginForm & {
    name: string;
}

export default function RegistrationForm() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const isAuth = useSelector((state: RootState) => state.user.isAuth);
    React.useEffect(() => {
        if(isAuth) {
            navigate('/main', {replace: true});
        }
    }, [isAuth]);

    const submitData = () => {
        const body = {
            name: values.name,
            log: values.login,
            pas: values.password,
            img: ""
        };
        dispatch(submitUser(body))
    }

    const {values, getFieldProps, handleSubmit, errors} = useForm<RegestrationFormType>({
        initialValues: {name: '', login: '', password: ''}, 
        onSubmit: submitData, 
        validate: validRegestration
    })

    return (
        <form onSubmit={handleSubmit} aria-label="форма регистрации нового пользователя" className={styles.regForm}>
            <Input 
                {...getFieldProps('name')}
                label="Имя" 
                classNames={ dynamicLabel }/>
            <Input 
                {...getFieldProps('login')}
                label="Логин" 
                classNames={ dynamicLabel }/>
            <Input 
                {...getFieldProps('password')}
                type="password"
                label="Пароль" 
                classNames={ dynamicLabel }/>

            <button type="submit" className="main-btn--black"> Зарегистроваться </button>
        </form>
    )
}