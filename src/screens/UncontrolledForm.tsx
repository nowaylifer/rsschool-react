import { FormEvent, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ValidationError } from 'yup';
import { Form, addForm, selectCountryOptions, selectGenderOptions } from '@/redux/formSlice';
import TextField from '@/components/TextField';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import ImageUpload from '../components/ImageUpload';
import ProfilePicture from '../components/ProfilePicture';
import { IMAGE_EXT, IMAGE_MAX_SIZE, LocationState } from '@/constants';
import { formSchema, calcPasswordStrength, cn, getValidationErrors, toBase64 } from '@/utils';
import Checkbox from '../components/Checkbox';
import { FormFields, PasswordStrength } from '@/types';
import ValidationErrorMessage from '../components/ValidationErrorMessage';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import Box from '@/components/Box';
import { useNavigate } from 'react-router-dom';

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

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>(initialErrorsState);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const countryInputRef = useRef<HTMLInputElement | null>(null);
  const genderInputRef = useRef<HTMLInputElement | null>(null);
  const ageInputRef = useRef<HTMLInputElement | null>(null);
  const imageFileRef = useRef<File | null>(null);
  const termsInputRef = useRef<HTMLInputElement | null>(null);
  const countryOptions = useAppSelector(selectCountryOptions);
  const genderOptions = useAppSelector(selectGenderOptions);
  const [isDirty, setIsDirty] = useState(false);
  const [pwdStrength, setPwdStrength] = useState<PasswordStrength>('weak');
  const navigate = useNavigate();

  const onFileUpload = useCallback(async (event: FormEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

    try {
      await formSchema.validateAt('image', { image: file });
      imageFileRef.current = file;
      setImageSrc(URL.createObjectURL(file));
    } catch (error) {
      setValidationErrors((prev) => ({ ...prev, image: (error as ValidationError).message }));
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataObj = Object.fromEntries(new FormData(event.currentTarget)) as unknown as FormFields;

    Object.assign(formDataObj, {
      terms: termsInputRef.current?.checked,
      gender: genderInputRef.current?.value,
      country: countryInputRef.current?.value,
      age: Number(ageInputRef.current?.value),
      image: imageFileRef.current,
    });

    try {
      await formSchema.validate(formDataObj, { abortEarly: false });

      if (formDataObj.image) {
        const imgBase64 = await toBase64(formDataObj.image);
        const form: Form = { ...formDataObj, image: imgBase64 };
        dispatch(addForm(form));
      } else {
        dispatch(addForm(formDataObj));
      }

      navigate('/', { state: LocationState.FORM_ADDED });
    } catch (error) {
      const errors = getValidationErrors<Exclude<keyof FormFields, 'image'>>(error as ValidationError);
      setValidationErrors(({ image }) => ({ image, ...errors }));
      setIsDirty(true);
      setPwdStrength(errors.password ? 'weak' : calcPasswordStrength(passwordInputRef.current!.value));
    }
  };

  return (
    <Box>
      <form noValidate className="flex gap-x-12" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {imageSrc ? (
            <ProfilePicture imageSrc={imageSrc} />
          ) : (
            <>
              <ImageUpload
                onChange={onFileUpload}
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
              ref={countryInputRef}
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
              ref={genderInputRef}
            />
            <ValidationErrorMessage message={validationErrors.gender} />
          </div>
          <div className="col-span-1">
            <TextField
              ref={ageInputRef}
              label="Age"
              name="age"
              type="number"
              min={0}
              isError={!!validationErrors.age}
            />
            <ValidationErrorMessage message={validationErrors.age} />
          </div>
          <div className="col-span-6">
            <Checkbox label="Accept terms and conditions" name="terms" ref={termsInputRef} />
            <ValidationErrorMessage message={validationErrors.terms} />
          </div>
          <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">Submit</button>
        </div>
      </form>
    </Box>
  );
};

export default UncontrolledForm;
