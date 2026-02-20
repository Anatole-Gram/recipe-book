export const CYRILLIC_1_PLUS = (v: string): boolean => (v.match(/\p{Script=Cyrillic}/gu) || []).length >= 1
export const CYRILLIC_3_PLUS = (v: string): boolean => (v.match(/\p{Script=Cyrillic}/gu) || []).length >= 3
export const CYRILLIC_10_PLUS = (v: string): boolean => (v.match(/\p{Script=Cyrillic}/gu) || []).length >= 10
export const NON_ZERO_NUMBER = /^-?\d+(.\d+)?$/;
export const IMG_URL_REGEX = /^https?:\/\/.+\.(?:png|jpe?g|gif|webp|svg)(?:\?.*)?$/i;