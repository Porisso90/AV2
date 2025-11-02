import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TipoTeste, ResultadoTeste } from '../enums';
import '../pages/CadastroAeronavePage.css';

interface FormAdicionarTesteProps {
  codigoAeronave: string;
  onClose: () => void;
}

type ResultadoOuPendente = ResultadoTeste | 'PENDENTE';

export const FormAdicionarTeste = ({ codigoAeronave, onClose }: FormAdicionarTesteProps) => {
  const { adicionarTeste } = useAppContext();

  const [tipo, setTipo] = useState<TipoTeste>(TipoTeste.ELETRICO);
  const [resultado, setResultado] = useState<ResultadoOuPendente>('PENDENTE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const resultadoFinal = resultado === 'PENDENTE' ? null : resultado;
    
    adicionarTeste(codigoAeronave, { tipo, resultado: resultadoFinal });
    
    onClose();
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