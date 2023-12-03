import { Controller, useForm, SubmitHandler, SubmitErrorHandler, useFormState } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { FormFields, PasswordStrength } from '@/types';
import { useEffect, useState } from 'react';
import { selectCountryOptions, selectGenderOptions, addForm, Form } from '@/redux/formSlice';
import { cn, formSchema, toBase64 } from '@/utils';
import ProfilePicture from '../components/ProfilePicture';
import ImageUpload from '../components/ImageUpload';
import ValidationErrorMessage from '../components/ValidationErrorMessage';
import TextField from '../components/TextField';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import Autocomplete from '../components/Autocomplete/Autocomplete';
import Checkbox from '../components/Checkbox';
import { IMAGE_EXT, IMAGE_MAX_SIZE } from '@/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { calcPasswordStrength } from '@/utils';
import Box from '@/components/Box';

const HookForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    watch,
    getFieldState,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({ resolver: yupResolver(formSchema), mode: 'onChange', defaultValues: { terms: false } });
  const { dirtyFields, isValidating, isValid } = useFormState({ control });
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const countryOptions = useAppSelector(selectCountryOptions);
  const genderOptions = useAppSelector(selectGenderOptions);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');
  const passwordValue = watch('password');

  useEffect(() => {
    if (isValidating || imageSrc) return;

    const { invalid } = getFieldState('image');
    const imageFile = getValues('image');

    if (!invalid && imageFile) {
      setImageSrc(URL.createObjectURL(imageFile));
    }
  }, [isValidating]);

  useEffect(() => {
    setPasswordStrength(calcPasswordStrength(passwordValue ?? ''));
  }, [passwordValue]);

  const onValidHandler: SubmitHandler<FormFields> = async (data) => {
    if (data.image) {
      const imgBase64 = await toBase64(data.image);
      const form: Form = { ...data, image: imgBase64 };
      dispatch(addForm(form));
      return;
    }

    dispatch(addForm(data));
  };

  const onInvalidHandler: SubmitErrorHandler<FormFields> = (error) => {
    console.log(error);
  };

  return (
    <Box>
      <form noValidate className="flex gap-x-12" onSubmit={handleSubmit(onValidHandler, onInvalidHandler)}>
        <div className="flex flex-col">
          {imageSrc ? (
            <ProfilePicture imageSrc={imageSrc} />
          ) : (
            <>
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <ImageUpload
                    {...field}
                    value=""
                    onChange={(event) => {
                      onChange(event.currentTarget.files?.[0]);
                    }}
                    maxSize={IMAGE_MAX_SIZE}
                    acceptExtensions={IMAGE_EXT}
                    className="mb-4"
                  />
                )}
              />
              <ValidationErrorMessage message={errors.image?.message} />
            </>
          )}
        </div>
        <div className={cn('grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-6')}>
          <div className="col-span-6">
            <TextField label="Name" {...register('name')} isError={!!errors.name} />
            <ValidationErrorMessage message={errors.name?.message} />
          </div>
          <div className="col-span-6">
            <TextField label="Email" {...register('email')} type="email" isError={!!errors.email} />
            <ValidationErrorMessage message={errors.email?.message} />
          </div>
          <div className="col-span-3">
            <div className="relative">
              <TextField
                label="Password"
                {...register('password')}
                type="password"
                isError={!!errors.password}
                className="z-1 relative"
              />
              {dirtyFields.password && passwordValue && (
                <PasswordStrengthBar
                  strength={errors.password ? 'weak' : passwordStrength}
                  className="absolute bottom-[4px] left-[5px] right-[5px] z-0"
                />
              )}
            </div>
            <ValidationErrorMessage message={errors.password?.message} />
          </div>
          <div className="col-span-3">
            <TextField
              label="Confirm password"
              {...register('passwordConfirm')}
              type="password"
              isError={!!errors.passwordConfirm}
            />
            <ValidationErrorMessage message={errors.passwordConfirm?.message} />
          </div>
          <div className="col-span-3">
            <Autocomplete
              label="Country"
              options={countryOptions}
              placeholder="Choose a country"
              register={register}
              name="country"
              isError={!!errors.country}
            />
            <ValidationErrorMessage message={errors.country?.message} />
          </div>
          <div className="col-span-2">
            <Autocomplete
              label="Gender"
              register={register}
              name="gender"
              options={genderOptions}
              placeholder="Choose a gender"
              isError={!!errors.gender}
            />
            <ValidationErrorMessage message={errors.gender?.message} />
          </div>
          <div className="col-span-1">
            <TextField {...register('age')} label="Age" name="age" type="number" min={0} isError={!!errors.age} />
            <ValidationErrorMessage message={errors.age?.message} />
          </div>
          <div className="col-span-6">
            <Checkbox {...register('terms')} label="Accept terms and conditions" name="terms" />
            <ValidationErrorMessage message={errors.terms?.message} />
          </div>
          <button
            disabled={!isValid}
            className={cn(
              'mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700',
              !isValid && 'hover:bg-blue-30 bg-blue-300'
            )}
          >
            Submit
          </button>
        </div>
      </form>
    </Box>
  );
};

export default HookForm;
