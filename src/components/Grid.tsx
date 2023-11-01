import { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

interface Props extends ComponentProps<'div'> {
  children: Iterable<ReactNode>;
}

export const Grid = ({ className, children, ...rest }: Props) => (
  <div
    className={cn(
      'grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] justify-items-center gap-6',
      className
    )}
    {...rest}
  >
    {[...children].map((child, index) => (
      <div className="flex max-w-[22rem]" key={index}>
        {child}
      </div>
    ))}
  </div>
);

export default Grid;
