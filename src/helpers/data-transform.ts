import { FirestoreError } from 'firebase/firestore';

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

export function transformCodeToMessage(code: string) {
  return code.split('/')[1].replaceAll('-', ' ');
}

export function parseError(e: unknown) {
  const error = e as FirestoreError;

  if ('name' in error && error.name === 'FirebaseError') {
    return transformCodeToMessage(error.code);
  } else if (error.message) {
    return error.message;
  } else {
    return 'unexpected error';
  }
}
