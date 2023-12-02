import { useCallback, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectCountryOptions, selectGenderOptions } from '@/redux/formSlice';
import TextField from '@/components/TextField';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import ImageUpload from './ImageUpload';
import { cn } from '@/utils';
import ProfilePicture from './ProfilePicture';
import { IMAGE_EXT, IMAGE_MAX_SIZE } from '@/constants';
import { imageSchema } from '@/utils';
import { ValidationError } from 'yup';

type Props = {
  className?: string;
  validateImageFile?: (file: File) => boolean;
};

const UncontrolledForm = ({ className }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState<ValidationError | null>(null);
  const countryOptions = useAppSelector(selectCountryOptions);
  const genderOptions = useAppSelector(selectGenderOptions);

  const onFileUpload = useCallback(async (file: File) => {
    try {
      await imageSchema.validate(file);
      setImageSrc(URL.createObjectURL(file));
    } catch (error) {
      setImageError(error as ValidationError);
    }
  }, []);

  return (
    <form className={cn('flex gap-x-12', className)}>
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
            <p className="text-red-600">{imageError?.message}</p>
          </>
        )}
      </div>
      <div className={cn('grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-6')}>
        <TextField label="Name" name="name" className="col-span-6" />
        <TextField label="Email" name="email" type="email" className="col-span-6" />
        <TextField label="Password" name="password" type="password" className="col-span-3" />
        <TextField label="Confirm password" name="confirmPassword" type="password" className="col-span-3" />
        <Autocomplete
          label="Country"
          name="country"
          options={countryOptions}
          placeholder="Choose a country"
          className="col-span-3"
        />
        <Autocomplete
          label="Gender"
          name="gender"
          options={genderOptions}
          placeholder="Choose a gender"
          className="col-span-2"
        />
        <TextField label="Age" name="age" type="number" min={0} className="col-span-1" />
        <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
