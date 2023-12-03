import { cn } from '@/utils';
import { ComponentProps, useId, forwardRef } from 'react';

type Props = {
  label: string;
} & ComponentProps<'input'>;

const Checkbox = forwardRef<HTMLInputElement, Props>(({ label, className, ...delegated }, ref) => {
  const id = useId();

  return (
    <div className={cn('flex gap-x-3', className)}>
      <input id={id} type="checkbox" ref={ref} {...delegated} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
});

export default Checkbox;
