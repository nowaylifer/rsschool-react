import { ComponentProps } from 'react';
import { cn } from '../utils';

const Button = ({ className, ...rest }: ComponentProps<'button'>) => (
  <button
    className={cn(
      'rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring',
      className
    )}
    {...rest}
  ></button>
);

export default Button;
