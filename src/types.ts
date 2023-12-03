export type FormFields = {
  name: string;
  age?: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender?: 'male' | 'female';
  country?: string;
  terms: string;
  image?: File;
};

export type PasswordStrength = (typeof PasswordStrength)[keyof typeof PasswordStrength];
export const PasswordStrength = {
  Weak: 'weak',
  Okay: 'okay',
  Strong: 'strong',
} as const;
