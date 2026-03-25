export const CYRILLIC_1_PLUS = (v: string): boolean => (v.match(/\p{Script=Cyrillic}/gu) || []).length >= 1
export const CYRILLIC_3_PLUS = (v: string): boolean => (v.match(/\p{Script=Cyrillic}/gu) || []).length >= 3
export const CYRILLIC_10_PLUS = (v: string): boolean => (v.match(/\p{Script=Cyrillic}/gu) || []).length >= 10
export const NON_ZERO_NUMBER = /^-?\d+(.\d+)?$/;
export const IMG_URL_REGEX = /^https?:\/\/.+\.(?:png|jpe?g|gif|webp|svg)(?:\?.*)?$/i;
export const LOG_REGEX = /^[A-Za-z0-9._-]{3,20}$/; //(3–20 символов, только латиница, цифры, . _ -)
export const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; //Минимум 8 символов, хотя бы одна строчная, одна заглавная и цифра