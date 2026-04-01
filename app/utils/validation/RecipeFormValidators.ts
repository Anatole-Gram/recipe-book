import type { RecipeSummary, RecipeIngredient, RecipeStep } from "@/store/store.types";
import type { LoginForm } from "@/components/forms/auth-form/AuthFormUser";
import type { RegestrationFormType } from "@/components/forms/registration-form/RegistrationForm";
import {CYRILLIC_1_PLUS, CYRILLIC_3_PLUS, CYRILLIC_10_PLUS, NON_ZERO_NUMBER, IMG_URL_REGEX, LOG_REGEX, PASS_REGEX} from "../../constans/regex";


// Общий тип правила валидации: возвращает сообщение об ошибке или  typeundefined 
type ValidationRule = (value: any) => string | undefined;

// Схема валидации для типа T 
export type ValidationSchema<T> = { [K in keyof T]?: ValidationRule; };

// Глобальная функция валидирования по схеме 
 function validateWithSchema<T>(data: T, schema: ValidationSchema<T>): { valid: boolean; errors: Partial<Record<keyof T, string>> } {

    const errors: Partial<Record<keyof T, string>> = {};

    for (const key in schema) { 
        const rule = (schema as any)[key] as ValidationRule; 
        if (rule) { const value = (data as any)[key]; 
            const error = rule(value); 
            if (error) { (errors as any)[key] = error; } 
        } 
    };

    const valid = Object.keys(errors).length === 0; 
    return { valid, errors: errors as Partial<Record<keyof T, string>> }; 
};


// RecipeIngredient 
const ingredientSchema: ValidationSchema<RecipeIngredient> = { 
    title: (v: any) => CYRILLIC_3_PLUS(v) ? undefined : 'Укажите ингредиент', 
    count: (v: any) => NON_ZERO_NUMBER.test(v) ? undefined : 'Укажите количество', 
    unit: (v: any) => CYRILLIC_1_PLUS(v) ? undefined : 'Укажите единицы измерения', 
};

export const validateIngredient = (data: RecipeIngredient) => validateWithSchema(data, ingredientSchema);

// RecipeSummary 
const summarySchema: ValidationSchema<RecipeSummary> = { 
    title: (v: any) => CYRILLIC_3_PLUS(v) ? undefined : 'Укажите заголовок', 
    // img: (v: any) => IMG_URL_REGEX.test(v) ? undefined : 'Укажите валидное изображение', 
    description: (v: any) => CYRILLIC_10_PLUS(v) ? undefined : 'Укажите описание', 
};

export const validateSummary = (data: RecipeSummary) => validateWithSchema(data, summarySchema);

// RecipeStep 
const stepSchema: ValidationSchema<RecipeStep> = { 
    description: (v: any) => CYRILLIC_10_PLUS(v) ? undefined : 'Укажите описание шага', 
    // img: (v: any) => IMG_URL_REGEX.test(v) ? undefined : 'Укажите изображение', 
};

export const validateStep = (data: RecipeStep) => validateWithSchema(data, stepSchema);

// Auth Form
const loginShema: ValidationSchema<LoginForm> = {
    login: (v: string) => LOG_REGEX.test(v) ? undefined : 'некорректный логин',
    password: (v: string) => PASS_REGEX.test(v) ? undefined : 'некорректный пароль'
};

export const validAuth = (data: LoginForm) => validateWithSchema(data, loginShema);

const registrationShema: ValidationSchema<RegestrationFormType> = {
    name: (v: string) => LOG_REGEX.test(v) ? undefined : 'некорректное имя',
    login: (v: string) => LOG_REGEX.test(v) ? undefined : 'некорректный логин',
    password: (v: string) => PASS_REGEX.test(v) ? undefined : 'некорректный пароль'
}

export const validRegestration = (data: RegestrationFormType) =>  validateWithSchema(data, registrationShema);


