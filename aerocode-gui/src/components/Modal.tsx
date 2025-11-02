import type { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ titulo, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{titulo}</h3>
          <button onClick={onClose} className="modal-close-button">&times;</button>
        </header>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};