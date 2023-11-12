import { ComponentProps, ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '../utils';
import Spinner from './Spinner';
import Backdrop from './Backdrop';

export const Body = ({ className, ...rest }: ComponentProps<'div'>) => {
  return (
    <div className={cn('rounded-md bg-white px-16 py-14 text-center', className)} {...rest}></div>
  );
};

interface ModalProps extends ComponentProps<'div'> {
  delay?: number;
  children: ReactNode;
}

const Modal = ({ delay = 25, ...rest }: ModalProps) => {
  const [showing, setShowing] = useState(false);
  const timerIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerIdRef.current = setTimeout(() => setShowing(true), delay);
    return () => clearTimeout(timerIdRef.current);
  }, [delay]);

  return showing ? <div {...rest} /> : null;
};

Modal.Backdrop = Backdrop;
Modal.Spinner = Spinner;
Modal.Body = Body;

export const ModalLoading = (props: Omit<ComponentProps<typeof Modal>, 'children'>) => {
  return (
    <Modal {...props} data-testid="modal-loading">
      <Modal.Backdrop>
        <Modal.Spinner />
      </Modal.Backdrop>
    </Modal>
  );
};

export default Modal;
