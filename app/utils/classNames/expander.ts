
type NamesShema<T> = { [k in keyof T]: string }

export default function expander<T>(name: keyof NamesShema<T>, value: string, classNames: NamesShema<T> )  {
  const clone = {...classNames};
  clone[name] += ` ${value}` 
  return clone;
} 