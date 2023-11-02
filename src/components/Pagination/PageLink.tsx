import { PropsWithChildren } from 'react';
import { Link, To } from 'react-router-dom';
import { cn } from '../../utils';

interface Props extends PropsWithChildren {
  to: To;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

const PageLink = ({ to, children, className, disabled = false, active = false }: Props) => (
  <Link
    to={to}
    className={cn(
      'border-blue-gray-100 text-blue-gray-500 hover:bg-light-300 mx-1 flex h-9 w-9 items-center justify-center rounded-full border bg-transparent bg-white p-0 text-sm font-semibold transition duration-150 ease-in-out hover:bg-gray-100',
      className,
      {
        'pointer-events-none bg-gray-50 text-gray-400': disabled,
        'bg-pink-500 text-white shadow-md hover:bg-pink-500': active,
      }
    )}
  >
    {children}
  </Link>
);

export default PageLink;
