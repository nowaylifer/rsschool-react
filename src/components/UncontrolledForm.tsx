import { FormEvent, useCallback, useRef, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectCountryOptions, selectGenderOptions } from '@/redux/formSlice';
import TextField from '@/components/TextField';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import ImageUpload from './ImageUpload';
import { cn, getValidationErrors } from '@/utils';
import ProfilePicture from './ProfilePicture';
import { IMAGE_EXT, IMAGE_MAX_SIZE } from '@/constants';
import { formSchema } from '@/utils';
import { ValidationError } from 'yup';
import Checkbox from './Checkbox';
import { FormFields } from '@/types';
import ValidationErrorMessage from './ValidationErrorMessage';
import PasswordStrengthBar from './PasswordStrengthBar';
import { calcPasswordStrength } from './PasswordStrengthBar';
import { PasswordStrength } from '@/types';

type Props = {
  className?: string;
};

type FormErrors = {
  [K in keyof FormFields]?: string;
};

const initialErrorsState: FormErrors = {
  name: '',
  age: '',
  email: '',
  password: '',
  passwordConfirm: '',
  gender: '',
  country: '',
  terms: '',
  image: '',
};

const UncontrolledForm = ({ className }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>(initialErrorsState);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const countryOptions = useAppSelector(selectCountryOptions);
  const genderOptions = useAppSelector(selectGenderOptions);
  const [isDirty, setIsDirty] = useState(false);
  const [pwdStrength, setPwdStrength] = useState<PasswordStrength>('weak');

  const onFileUpload = useCallback(async (file: File) => {
    try {
      await formSchema.validateAt('image', { image: file });
      setImageSrc(URL.createObjectURL(file));
    } catch (error) {
      setValidationErrors((prev) => ({ ...prev, image: (error as ValidationError).message }));
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataObj = Object.fromEntries(new FormData(event.currentTarget));

    try {
      await formSchema.validate(formDataObj, { abortEarly: false });
      alert('Success');
    } catch (error) {
      const errors = getValidationErrors<Exclude<keyof FormFields, 'image'>>(error as ValidationError);
      setValidationErrors(({ image }) => ({ image, ...errors }));
      setIsDirty(true);
      setPwdStrength(errors.password ? 'weak' : calcPasswordStrength(passwordInputRef.current!.value));
    }
  };

  return (
    <form noValidate className={cn('flex gap-x-12', className)} onSubmit={handleSubmit}>
      <div className="flex flex-col">
        {imageSrc ? (
          <ProfilePicture imageSrc={imageSrc} />
        ) : (
          <>
            <ImageUpload
              onFileUpload={onFileUpload}
              maxSize={IMAGE_MAX_SIZE}
              acceptExtensions={IMAGE_EXT}
              className="mb-4"
            />
            <ValidationErrorMessage message={validationErrors.image} />
          </>
        )}
      </div>
      <div className={cn('grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-6')}>
        <div className="col-span-6">
          <TextField label="Name" name="name" isError={!!validationErrors.name} />
          <ValidationErrorMessage message={validationErrors.name} />
        </div>
        <div className="col-span-6">
          <TextField label="Email" name="email" type="email" isError={!!validationErrors.email} />
          <ValidationErrorMessage message={validationErrors.email} />
        </div>
        <div className="col-span-3">
          <div className="relative">
            <TextField
              label="Password"
              name="password"
              type="password"
              isError={!!validationErrors.password}
              ref={passwordInputRef}
              className="z-1 relative"
            />
            {isDirty && (
              <PasswordStrengthBar
                strength={pwdStrength}
                className="absolute bottom-[4px] left-[5px] right-[5px] z-0"
              />
            )}
          </div>
          <ValidationErrorMessage message={validationErrors.password} />
        </div>
        <div className="col-span-3">
          <TextField
            label="Confirm password"
            name="passwordConfirm"
            type="password"
            isError={!!validationErrors.passwordConfirm}
          />
          <ValidationErrorMessage message={validationErrors.passwordConfirm} />
        </div>
        <div className="col-span-3">
          <Autocomplete
            label="Country"
            name="country"
            options={countryOptions}
            placeholder="Choose a country"
            isError={!!validationErrors.country}
          />
          <ValidationErrorMessage message={validationErrors.country} />
        </div>
        <div className="col-span-2">
          <Autocomplete
            label="Gender"
            name="gender"
            options={genderOptions}
            placeholder="Choose a gender"
            isError={!!validationErrors.gender}
          />
          <ValidationErrorMessage message={validationErrors.gender} />
        </div>
        <div className="col-span-1">
          <TextField label="Age" name="age" type="number" min={0} isError={!!validationErrors.age} />
          <ValidationErrorMessage message={validationErrors.age} />
        </div>
        <div className="col-span-6">
          <Checkbox label="Accept terms and conditions" name="terms" />
          <ValidationErrorMessage message={validationErrors.terms} />
        </div>
        <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
