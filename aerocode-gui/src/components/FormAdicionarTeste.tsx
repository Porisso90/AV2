// src/components/FormAdicionarTeste.tsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TipoTeste, ResultadoTeste } from '../enums'; // Importamos os enums

// Usamos os estilos de formulário que já criámos
import '../pages/CadastroAeronavePage.css';

interface FormAdicionarTesteProps {
  codigoAeronave: string;
  onClose: () => void; // Função para fechar o modal
}

// Criamos um tipo local para incluir a opção "Pendente"
type ResultadoOuPendente = ResultadoTeste | 'PENDENTE';

export const FormAdicionarTeste = ({ codigoAeronave, onClose }: FormAdicionarTesteProps) => {
  const { adicionarTeste } = useAppContext();

  // Estados locais para o formulário
  const [tipo, setTipo] = useState<TipoTeste>(TipoTeste.ELETRICO);
  const [resultado, setResultado] = useState<ResultadoOuPendente>('PENDENTE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convertemos 'PENDENTE' de volta para 'null'
    const resultadoFinal = resultado === 'PENDENTE' ? null : resultado;
    
    // Chama a função do contexto que criámos na Etapa 8.8
    adicionarTeste(codigoAeronave, { tipo, resultado: resultadoFinal });
    
    onClose(); // Fecha o modal após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="form-container-modal">
      <div className="form-group">
        <label htmlFor="teste-tipo">Tipo de Teste</label>
        <select
          id="teste-tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoTeste)}
        >
          <option value={TipoTeste.ELETRICO}>Elétrico</option>
          <option value={TipoTeste.HIDRAULICO}>Hidráulico</option>
          <option value={TipoTeste.AERODINAMICO}>Aerodinâmico</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="teste-resultado">Resultado</label>
        <select
          id="teste-resultado"
          value={resultado}
          onChange={(e) => setResultado(e.target.value as ResultadoOuPendente)}
        >
          <option value="PENDENTE">Pendente</option>
          <option value={ResultadoTeste.APROVADO}>Aprovado</option>
          <option value={ResultadoTeste.REPROVADO}>Reprovado</option>
        </select>
      </div>

      <div className="form-footer">
        <button type="button" className="button-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="button-primary">
          Salvar Teste
        </button>
      </div>
    </form>
  );
};