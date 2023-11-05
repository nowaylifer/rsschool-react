import { ComponentProps, forwardRef } from 'react';
import { cn } from '../utils';

const Backdrop = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-10 flex animate-fadeIn items-center justify-center bg-[rgba(0,0,0,0.5)] transition-opacity',
          className
        )}
        {...rest}
      ></div>
    );
  }
);

export default Backdrop;
