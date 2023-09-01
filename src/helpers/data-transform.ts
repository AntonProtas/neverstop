export type PickKeysByValueType<T extends object, U> = keyof Pick<
  T,
  {
    [P in keyof T]: T[P] extends U ? P : never;
  }[keyof T]
>;

export function toHash<
  T extends NonNullable<unknown>,
  K extends PickKeysByValueType<T, string | undefined>,
>(arr: T[], key: K): Record<string, T> {
  return (Array.isArray(arr) ? arr : []).reduce((acm: Record<string, T>, current: T) => {
    const value = current[key];
    if (typeof value === 'string') {
      acm[value] = current;
    }
    return acm;
  }, {});
}
