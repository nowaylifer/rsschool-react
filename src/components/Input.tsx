import { ComponentProps } from 'react';
import { cn } from '../utils';

const Input = ({ className, ...rest }: ComponentProps<'input'>) => (
  <input
    className={cn(
      'w-full appearance-none rounded-md border px-3 py-2 font-medium leading-tight text-gray-700 shadow focus:outline-none focus:ring',
      className
    )}
    {...rest}
  />
);

export default Input;
