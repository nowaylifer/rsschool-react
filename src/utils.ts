import { twMerge } from 'tailwind-merge';
import { clsx, ClassValue } from 'clsx';
import { object, mixed, string, ObjectSchema, number, ValidationError, boolean } from 'yup';
import { IMAGE_MAX_SIZE, IMAGE_EXT } from './constants';
import { FormFields, PasswordStrength } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export function getValidationErrors<ErrorPath extends string>(err: ValidationError) {
  const validationErrors = {} as Record<ErrorPath, string>;

  err.inner.forEach((error) => {
    if (error.path) {
      validationErrors[error.path as ErrorPath] = error.message;
    }
  });

  return validationErrors;
}

const allowedMimeTypes = IMAGE_EXT.map((ext) => `image/${ext}`);

const requiredMsg = 'This field is required';
const trimMsg = 'Must not contain trailing or leading whitespace';

export const calcPasswordStrength = (password: string): PasswordStrength => {
  const len = password.length;
  return len >= 12 ? 'strong' : len >= 8 ? 'okay' : 'weak';
};

export const formSchema: ObjectSchema<FormFields> = object({
  name: string()
    .trim(trimMsg)
    .required(requiredMsg)
    .when({
      is: (name: string) => !!name,
      then: (schema) =>
        schema.test(
          'first-letter-uppercase',
          'First letter should be in uppercase',
          (string) => string[0].toLocaleUpperCase() === string[0]
        ),
    }),
  age: number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'Invalid age'),
  gender: string<'male' | 'female'>().optional(),
  email: string().trim(trimMsg).required(requiredMsg).email('Invalid email'),
  password: string()
    .trim(trimMsg)
    .required(requiredMsg)
    .when({
      is: (pwd: string) => !!pwd,
      then: (schema) => schema.min(8, 'Must be at least 8 characters long'),
    })
    .when({
      is: (pwd: string) => !!pwd && pwd.length >= 8,
      then: (schema) =>
        schema
          .matches(/(?=\p{N})/gu, 'Must contain at least one digit')
          .matches(/(?=[\p{S}\p{P}])/gu, 'Must contain at least one special character')
          .matches(/(?=\p{Ll})/gu, 'Must contain at least one lowercase letter')
          .matches(/(?=\p{Lu})/gu, 'Must contain at least one uppercase letter'),
    }),
  passwordConfirm: string()
    .required(requiredMsg)
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
  country: string().optional(),
  terms: boolean().default(false).oneOf([true], 'You must accept terms and conditions'),
  image: mixed<File>().when({
    is: (image: File) => !!image,
    then: (schema) =>
      schema
        .test('size', `Error: file size exceeds ${IMAGE_MAX_SIZE}MB`, (file) => {
          return !!file && file.size / 1e6 < IMAGE_MAX_SIZE;
        })
        .test('extension', 'Error: invalid file extension', (file) => !!file && allowedMimeTypes.includes(file.type)),
  }),
});
