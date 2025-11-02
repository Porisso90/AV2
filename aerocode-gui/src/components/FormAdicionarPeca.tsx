// src/components/FormAdicionarPeca.tsx
import React, { useState } from 'react';
import { TipoPeca } from '../enums';
import { useAppContext } from '../context/AppContext';

// Usamos os estilos de formulário que já criámos
import '../pages/CadastroAeronavePage.css';

interface FormAdicionarPecaProps {
  codigoAeronave: string;
  onClose: () => void; // Função para fechar o modal
}

export const FormAdicionarPeca = ({ codigoAeronave, onClose }: FormAdicionarPecaProps) => {
  const { adicionarPeca } = useAppContext();

  // Estados locais para o formulário
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<TipoPeca>(TipoPeca.NACIONAL);
  const [fornecedor, setFornecedor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Chama a função do contexto que criámos na Etapa 8.2
    adicionarPeca(codigoAeronave, { nome, tipo, fornecedor });
    
    onClose(); // Fecha o modal após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-modal">
      <div className="form-group">
        <label htmlFor="peca-nome">Nome da Peça</label>
        <input
          type="text"
          id="peca-nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="peca-tipo">Tipo</label>
        <select
          id="peca-tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoPeca)}
        >
          <option value={TipoPeca.NACIONAL}>Nacional</option>
          <option value={TipoPeca.IMPORTADA}>Importada</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="peca-fornecedor">Fornecedor</label>
        <input
          type="text"
          id="peca-fornecedor"
          value={fornecedor}
          onChange={(e) => setFornecedor(e.target.value)}
          required
        />
      </div>

      <div className="form-footer">
        <button type="button" className="button-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="button-primary">
          Salvar Peça
        </button>
      </div>
    </form>
  );
};