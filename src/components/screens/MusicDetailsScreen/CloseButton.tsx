import { ComponentProps, forwardRef } from 'react';
import Cross from '@/lib/icons/cross.svg';
import { cn } from '@/lib/utils';

const CloseButton = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  ({ className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('rounded-full border-white ring-gray-100 transition', className)}
        {...rest}
        aria-label="Close"
      >
        <Cross width="30px" height="30px" className="fill-white/70 transition hover:fill-white" />
      </button>
    );
  }
);

CloseButton.displayName = CloseButton.name;

export default CloseButton;
