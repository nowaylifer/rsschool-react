import { ComponentProps, useCallback, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { selectCountryOptions, selectGenderOptions } from '@/redux/formSlice';
import TextField from '@/components/TextField';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import ImageUpload from './ImageUpload';
import { cn } from '@/utils';
import ProfilePicture from './ProfilePicture';

const UncontrolledForm = ({ className }: ComponentProps<'form'>) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const countryOptions = useAppSelector(selectCountryOptions);
  const genderOptions = useAppSelector(selectGenderOptions);

  const onFileUpload = useCallback((file: File) => {
    setImageSrc(URL.createObjectURL(file));
  }, []);

  return (
    <form className={cn('flex gap-x-12', className)}>
      {imageSrc ? (
        <ProfilePicture imageSrc={imageSrc} className="mb-12" />
      ) : (
        <ImageUpload onFileUpload={onFileUpload} className="mb-12" />
      )}
      <div className={cn('grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-6')}>
        <TextField label="Name" className="col-span-6" />
        <TextField label="Email" type="email" className="col-span-6" />
        <TextField label="Password" type="password" className="col-span-3" />
        <TextField label="Confirm password" type="password" className="col-span-3" />
        <Autocomplete label="Country" options={countryOptions} placeholder="Choose a country" className="col-span-3" />
        <Autocomplete label="Gender" options={genderOptions} placeholder="Choose a gender" className="col-span-2" />
        <TextField label="Age" type="number" min={0} className="col-span-1" />
        <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">Submit</button>
      </div>
    </form>
  );
};

export default UncontrolledForm;
