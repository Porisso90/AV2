// src/pages/CadastroAeronavePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TipoAeronave } from '../enums';
import { useAppContext } from '../context/AppContext'; // 1. Importar o hook

// Importar o CSS
import './CadastroAeronavePage.css';

export const CadastroAeronavePage = () => {
  const navigate = useNavigate();
  const { adicionarAeronave } = useAppContext(); // 2. Obter a nova função

  // Estados locais (sem alteração)
  const [codigo, setCodigo] = useState('');
  const [modelo, setModelo] = useState('');
  const [tipo, setTipo] = useState<TipoAeronave>(TipoAeronave.COMERCIAL);
  const [capacidade, setCapacidade] = useState('');
  const [alcance, setAlcance] = useState('');
  const [error, setError] = useState('');

  // 3. Implementar a lógica de submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar se os campos numéricos não estão vazios
    if (!capacidade || !alcance) {
        setError("Capacidade e Alcance são campos obrigatórios.");
        return;
    }

    // Converter para número
    const capacidadeNum = parseInt(capacidade, 10);
    const alcanceNum = parseInt(alcance, 10);

    // Chamar a função do contexto
    const resultado = adicionarAeronave({
        codigo,
        modelo,
        tipo,
        capacidade: capacidadeNum,
        alcance: alcanceNum
    });

    if (resultado.sucesso) {
        // Se deu certo, volta para o dashboard
        navigate('/dashboard');
    } else {
        // Se falhou (ex: código duplicado), mostra o erro
        setError(resultado.mensagem);
    }
  };

  return (
    // O JSX (HTML) do formulário permanece exatamente o mesmo
    <div className="form-page-container">
      <header className="form-header">
        <h1>Cadastrar Nova Aeronave</h1>
        <button onClick={() => navigate('/dashboard')} className="button-secondary">
          Voltar ao Dashboard
        </button>
      </header>

      <form className="form-container" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-grid">
          {/* Coluna 1 */}
          <div className="form-group">
            <label htmlFor="codigo">Código Único</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="modelo">Modelo</label>
            <input
              type="text"
              id="modelo"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo de Aeronave</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoAeronave)}
            >
              <option value={TipoAeronave.COMERCIAL}>Comercial</option>
              <option value={TipoAeronave.MILITAR}>Militar</option>
            </select>
          </div>

          {/* Coluna 2 */}
          <div className="form-group">
            <label htmlFor="capacidade">Capacidade (Passageiros)</label>
            <input
              type="number"
              id="capacidade"
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="alcance">Alcance (km)</label>
            <input
              type="number"
              id="alcance"
              value={alcance}
              onChange={(e) => setAlcance(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="button-primary">
            Salvar Aeronave
          </button>
        </div>
      </form>
    </div>
  );
};