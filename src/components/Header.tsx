import { ComponentProps } from 'react';
import { cn } from '../utils';

export const Header = ({ className, ...rest }: ComponentProps<'header'>) => (
  <header className={cn('flex gap-4', className)} {...rest}></header>
);

export default Header;
