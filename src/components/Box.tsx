import { ComponentProps } from 'react';
import { cn } from '@/utils';

const Box = ({ children, className }: ComponentProps<'div'>) => {
  return <div className={cn('mb-6 rounded bg-white p-4 px-4 shadow-lg md:p-12', className)}>{children}</div>;
};

export default Box;
