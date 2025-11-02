// src/components/Modal.tsx
import React, { ReactNode } from 'react';
import './Modal.css'; // Vamos criar este CSS a seguir

interface ModalProps {
  titulo: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode; // O conteúdo (ex: o formulário) virá aqui
}

export const Modal = ({ titulo, isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null; // Se não estiver aberto, não renderiza nada
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