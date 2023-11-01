import Modal from './Modal';
import Button from './Button';
import { FallbackProps } from './ErrorBoundary';

const ErrorFallBackModal = (props: FallbackProps) => {
  return (
    <Modal>
      <Modal.Backdrop>
        <Modal.Body>
          <h1 className="mb-4 text-xl font-bold text-slate-500">Something went wrong</h1>
          <Button onClick={props.resetErrorBoundary}>Try again</Button>
        </Modal.Body>
      </Modal.Backdrop>
    </Modal>
  );
};

export default ErrorFallBackModal;
