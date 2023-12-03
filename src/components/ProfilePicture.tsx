import { cn } from '@/utils';

type Props = {
  imageSrc: string;
  className?: string;
};

const ProfilePicture = ({ imageSrc, className }: Props) => {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={'flex h-48 w-48 items-center justify-center rounded-full border-2 border-gray-300 bg-gray-50'}
        style={{ backgroundImage: `url(${imageSrc}` }}
      ></div>
    </div>
  );
};

export default ProfilePicture;
