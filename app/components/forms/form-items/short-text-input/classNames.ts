export type ClassNamesShortInput = { wrapper?: string; input?: string, label?: string };

export const simpleInput: ClassNamesShortInput = {
    wrapper: 'main-input-wraper', 
    input: 'main-input', 
    label: ''
};

export const dynamicLabel: ClassNamesShortInput = {
    wrapper: 'main-input-wraper main-input-wraper--dynamic-label', 
    input: 'main-input', 
    label: 'main-input-label main-input-label--dynamic'
};

// export const extendClassName = (name: 'wrapper' | 'input' | 'label', value: string, classNames: ClassNamesShortInput) => {
//     const clone = {...classNames};
//     clone[name] += ` ${value}`;
//     return clone;
// }