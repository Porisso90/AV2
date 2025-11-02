import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../pages/CadastroAeronavePage.css';

interface FormAdicionarEtapaProps {
  codigoAeronave: string;
  onClose: () => void;
}

export const FormAdicionarEtapa = ({ codigoAeronave, onClose }: FormAdicionarEtapaProps) => {
  const { adicionarEtapa } = useAppContext();
  const [nome, setNome] = useState('');
  const [prazo, setPrazo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    adicionarEtapa(codigoAeronave, { nome, prazo });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-modal">
      <div className="form-group">
        <label htmlFor="etapa-nome">Nome da Etapa</label>
        <input
          type="text"
          id="etapa-nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Montagem da Fuselagem"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="etapa-prazo">Prazo</label>
        <input
          type="text"
          id="etapa-prazo"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          placeholder="Ex: 15 dias"
          required
        />
      </div>

      <div className="form-footer">
        <button type="button" className="button-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="button-primary">
          Salvar Etapa
        </button>
      </div>
    </form>
  );
};