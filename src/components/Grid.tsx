import { ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

interface Props extends ComponentProps<'div'> {
  children: Iterable<ReactNode>;
  getChildId?: (child: ReactNode) => string | number;
}

export const Grid = ({ className, children, getChildId, ...rest }: Props) => (
  <div
    className={cn(
      'grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] justify-items-center gap-6',
      className
    )}
    {...rest}
  >
    {[...children].map((child, index) => (
      <div className="flex max-w-[356px]" key={getChildId ? getChildId(child) : index}>
        {child}
      </div>
    ))}
  </div>
);

export default Grid;
