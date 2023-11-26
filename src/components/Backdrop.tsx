import { ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Backdrop = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-fadeIn fixed inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.5)] transition-opacity',
          className
        )}
        {...rest}
      ></div>
    );
  }
);

Backdrop.displayName = Backdrop.name;

export default Backdrop;
