import { useId, forwardRef, ComponentProps } from 'react';
import { cn } from '../utils';
import Label from './Label';

type Props = {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  isError?: boolean;
} & ComponentProps<'input'>;

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ labelClassName, inputClassName, className, label, isError = false, ...delegated }, ref) => {
    const id = useId();

    return (
      <div className={cn(className)}>
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
        <input
          ref={ref}
          id={id}
          {...delegated}
          className={cn('mt-1 h-10 w-full rounded border bg-gray-50 px-4', isError && 'border-red-500', inputClassName)}
        />
      </div>
    );
  }
);

export default TextField;
