import { ComponentProps, useId } from 'react';
import { cn } from '@/utils';

type Props = {
  label: string;
} & Omit<ComponentProps<'input'>, 'type'>;

const RadioButton = ({ className, label, ...delegated }: Props) => {
  const id = useId();

  return (
    <div className={cn('mb-4 flex items-center', className)}>
      <input id={id} type="radio" className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" {...delegated} />
      <label htmlFor={id} className="ml-2 block text-sm font-medium text-gray-900">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
