// src/pages/DashboardPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Aeronave } from '../Aeronave'; // Importamos a classe para tipagem

import './DashboardPage.css';

export const DashboardPage = () => {
  // 1. Obter a lista de aeronaves do nosso estado global
  const { aeronaves } = useAppContext();

  // 2. Função para renderizar cada aeronave como um "card"
  const renderAeronaveCard = (aeronave: Aeronave) => (
    <div className="aeronave-card" key={aeronave.codigo}>
      <div className="card-header">
        <span className="aeronave-tipo">{aeronave.tipo}</span>
        <h3 className="aeronave-modelo">{aeronave.modelo}</h3>
        <p className="aeronave-codigo">{aeronave.codigo}</p>
      </div>
      <div className="card-body">
        <p><strong>Capacidade:</strong> {aeronave.capacidade} passageiros</p>
        <p><strong>Alcance:</strong> {aeronave.alcance} km</p>
      </div>
      <div className="card-footer">
        {/* Este link ainda não funciona, mas vamos criá-lo na Etapa 8 */}
        <Link to={`/aeronave/${aeronave.codigo}`} className="card-button">
          Gerenciar
        </Link>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard de Produção</h1>
        {/* Este link ainda não funciona, mas vamos criá-lo na Etapa 7 */}
        <Link to="/aeronaves/nova" className="button-primary">
          + Cadastrar Aeronave
        </Link>
      </header>

      <div className="aeronave-grid">
        {aeronaves.length > 0 ? (
          aeronaves.map(renderAeronaveCard)
        ) : (
          <p className="empty-message">Nenhuma aeronave cadastrada.</p>
        )}
      </div>
    </div>
  );
};