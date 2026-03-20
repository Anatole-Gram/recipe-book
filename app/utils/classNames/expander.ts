type ClassNamesSchema<T extends object> = { [K in keyof T]: string };

export default function expander<T extends object, K extends keyof T>(
  name: K,
  value: string,
  classNames: ClassNamesSchema<T>
): ClassNamesSchema<T> {
  const clone = { ...classNames };
  const current = clone[name] ?? '';
  clone[name] = current ? `${current} ${value}` : value;
  return clone;
}