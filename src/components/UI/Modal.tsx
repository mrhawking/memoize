import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import classes from './Modal.module.css';

type Props = {
  children: React.ReactNode;
  open: boolean;
  className: string;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ children, open, className = '', onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open])

  return (
    createPortal(
      <dialog ref={dialog} className={`${classes.modal} ${className}`} onClose={onClose}>
        {children}
      </dialog>,
      document.getElementById('modal'))
  );
}

export default Modal;