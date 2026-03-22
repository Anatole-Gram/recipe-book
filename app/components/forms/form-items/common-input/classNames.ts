export type ClassNamesCommonInput = { wrapper?: string; input?: string, label?: string };

export const simpleInput: ClassNamesCommonInput = {
    wrapper: 'main-input-wraper', 
    input: 'main-input', 
    label: ''
};

export const dynamicLabel: ClassNamesCommonInput = {
    wrapper: 'main-input-wraper main-input-wraper--dynamic-label', 
    input: 'main-input', 
    label: 'main-input-label main-input-label--dynamic'
};