import { useId, forwardRef, ComponentProps } from 'react';
import { cn } from '../utils';

type Props = {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
} & ComponentProps<'input'>;

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ labelClassName, inputClassName, className, label, ...delegated }, ref) => {
    const id = useId();

    return (
      <>
        <label htmlFor={id} className={cn('mb-2 block text-sm font-bold text-gray-700', labelClassName)}>
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          {...delegated}
          className={cn('mt-1 h-10 w-full rounded border bg-gray-50 px-4', inputClassName ?? className)}
        />
      </>
    );
  }
);

export default TextField;
