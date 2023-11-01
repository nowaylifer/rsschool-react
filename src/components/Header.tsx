import { ComponentProps } from 'react';
import { cn } from '../utils';
import ThrowError from './ThrowError';

export const Header = ({ className }: ComponentProps<'header'>) => (
  <div>
    <header className="my-10 flex gap-4">
      <h1 className={cn('text-3xl font-bold text-slate-400', className)}>Music Album Searcher</h1>
      <ThrowError />
    </header>
  </div>
);

export default Header;
