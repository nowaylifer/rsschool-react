import { ComponentProps, ReactNode, useEffect, useRef, useState } from 'react';
import Spinner from './Spinner';
import { cn } from '../utils';

const Backdrop = ({ className, ...rest }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex animate-fadeIn items-center justify-center bg-[rgba(0,0,0,0.5)] transition-opacity',
        className
      )}
      {...rest}
    ></div>
  );
};

export const Body = ({ className, ...rest }: ComponentProps<'div'>) => {
  return (
    <div className={cn('rounded-md bg-white px-16 py-14 text-center', className)} {...rest}></div>
  );
};

interface ModalProps {
  delay?: number;
  children: ReactNode;
}

const Modal = ({ delay = 25, children }: ModalProps) => {
  const [showing, setShowing] = useState(false);
  const timerIdRef = useRef<number>();

  useEffect(() => {
    timerIdRef.current = setTimeout(() => setShowing(true), delay);
    return () => clearTimeout(timerIdRef.current);
  }, [delay]);

  return showing ? children : null;
};

Modal.Backdrop = Backdrop;
Modal.Spinner = Spinner;
Modal.Body = Body;

export default Modal;
