import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

interface Props extends ComponentProps<'button'> {
  active?: boolean;
}

const PageButton = ({ className, disabled = false, active = false, ...rest }: Props) => (
  <button
    className={cn(
      'border-blue-gray-100 text-blue-gray-500 hover:bg-light-300 mx-1 flex h-9 w-9 items-center justify-center rounded-full border bg-white p-0 text-sm font-semibold transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring focus:delay-75',
      className,
      {
        'pointer-events-none bg-gray-50 text-gray-400 focus:outline-none focus:ring-0': disabled,
        'bg-pink-500 text-white shadow-md hover:bg-pink-500': active,
      }
    )}
    {...rest}
  />
);

export default PageButton;
