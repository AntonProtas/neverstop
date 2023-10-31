export type FormErrorType = 'min' | 'max' | 'required';

export function getFormError(name: string, type: string | undefined) {
  if (type === undefined) {
    return undefined;
  }

  return {
    min: `${name} should be bigger`,
    max: `${name} should be smaller`,
    required: `${name}  required`,
    default: 'field error',
  }[type];
}
