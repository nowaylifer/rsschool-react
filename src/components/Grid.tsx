import { Component, ComponentProps, ReactNode } from 'react';
import { cn } from '../utils';

interface Props extends ComponentProps<'div'> {
  children: Iterable<ReactNode>;
}

export class Grid extends Component<Props> {
  render() {
    const { className, children, ...props } = this.props;
    return (
      <div
        className={cn(
          'grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] justify-items-center gap-6',
          className
        )}
        {...props}
      >
        {[...children].map((child, index) => (
          <div className="flex max-w-[356px]" key={index}>
            {child}
          </div>
        ))}
      </div>
    );
  }
}

export default Grid;
