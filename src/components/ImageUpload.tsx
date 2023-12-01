import { FormEvent, useId } from 'react';
import UploadIcon from '@/assets/icons/upload.svg?react';
import { cn } from '@/utils';

type Props = {
  className?: string;
  onFileUpload: (file: File) => void;
};

const ImageUpload = ({ className, onFileUpload }: Props) => {
  const id = useId();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.[0]) {
      onFileUpload(event.currentTarget.files[0]);
    }
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <label
        htmlFor={id}
        className="flex h-48 w-48 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <UploadIcon />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Upload profile picture</span>
          </p>
          <p className="text-xs text-gray-500">PNG, JPG (MAX. 1mb)</p>
        </div>
        <input id={id} type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleChange} />
      </label>
    </div>
  );
};

export default ImageUpload;
