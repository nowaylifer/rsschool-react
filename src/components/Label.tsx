import { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/utils';

type Props<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

const Label = <T extends ElementType = 'label'>({ children, className, as, ...rest }: Props<T>) => {
  const TagName = as ?? 'label';

  return (
    <TagName className={cn('block text-sm font-semibold text-gray-700', className)} {...rest}>
      {children}
    </TagName>
  );
};

export default Label;
