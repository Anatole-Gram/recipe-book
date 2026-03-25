import React from "react";

type useFormParams<T> = {
    initialValues: T;
    onSubmit: (values: T) => void;
    validate: (values: T) => {
        valid: boolean;
        errors: Partial<Record<keyof T, string>>;
    };
}

export default function useForm<T>(params: useFormParams<T>) {

    const {initialValues, onSubmit, validate, } = params;
    const [values, setValues] = React.useState<T>(initialValues);
    const [resulValidate, setResulValidate] = React.useState<{ valid: boolean; errors: Partial<Record<keyof T, string>> }> ({valid: false, errors:{}});

    React.useEffect(() => {
        setResulValidate(validate(values))
    }, [values])

    const handleChange = <K extends keyof T>(name: K) => (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        const value = e.target.value;
        setValues((v) => ({...v, [name]: value}));
    };

    const getFieldProps = <K extends keyof T>(name: K) => ({
        name: String(name),
        value: values[name] ?? '',
        handleChange: handleChange(name),
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(resulValidate.valid) {
            onSubmit?.(values)
        }
    }


    return { values, getFieldProps, handleSubmit, errors: resulValidate.errors}
}
