import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from '@/utils';

type Props = {
  isSelected?: boolean;
} & ComponentPropsWithRef<'li'>;

const AutocompleteDropdownItem = forwardRef<HTMLLIElement, Props>(
  ({ children, className, isSelected = false, ...delegated }, ref) => {
    return (
      <li
        className={cn(
          'cursor-pointer border-b border-gray-200 px-5 py-3 text-stone-600 transition-colors hover:bg-slate-100',
          isSelected && 'bg-slate-200 hover:bg-slate-200',
          className
        )}
        ref={ref}
        {...delegated}
      >
        {children}
      </li>
    );
  }
);

export default AutocompleteDropdownItem;
