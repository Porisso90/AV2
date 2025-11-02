import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Modal } from '../components/Modal';
import { FormAdicionarPeca } from '../components/FormAdicionarPeca';
import { FormAdicionarEtapa } from '../components/FormAdicionarEtapa';
import { FormAdicionarTeste } from '../components/FormAdicionarTeste';

import './AeronaveDetalhesPage.css';

export const AeronaveDetalhesPage = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const { aeronaves, funcionarios } = useAppContext();
  const navigate = useNavigate();

  const [isModalPecaOpen, setIsModalPecaOpen] = useState(false);
  const [isModalEtapaOpen, setIsModalEtapaOpen] = useState(false);
  const [isModalTesteOpen, setIsModalTesteOpen] = useState(false);

  const aeronave = aeronaves.find(a => a.codigo === codigo);

  if (!aeronave) {
    return (
      <div className="detalhes-container">
        <header className="detalhes-header">
          <h1>Aeronave não encontrada</h1>
          <button onClick={() => navigate('/dashboard')} className="button-secondary">
            Voltar ao Dashboard
          </button>
        </header>
        <p>A aeronave com o código "{codigo}" não foi encontrada no sistema.</p>
      </div>
    );
  }

  return (
    <div className="detalhes-container">
      <header className="detalhes-header">
        <div>
          <h1>{aeronave.modelo}</h1>
          <span className="detalhes-codigo">{aeronave.codigo}</span>
        </div>
        <button onClick={() => navigate('/dashboard')} className="button-secondary">
          Voltar ao Dashboard
        </button>
      </header>

      <div className="detalhes-card">
        <h3>Informações Principais</h3>
        <div className="info-grid">
          <p><strong>Tipo:</strong> {aeronave.tipo}</p>
          <p><strong>Capacidade:</strong> {aeronave.capacidade} passageiros</p>
          <p><strong>Alcance:</strong> {aeronave.alcance} km</p>
        </div>
      </div>

      <div className="detalhes-card">
        <div className="card-header-actions">
          <h3>Peças</h3>
          <button 
            className="button-primary-small"
            onClick={() => setIsModalPecaOpen(true)}
          >
            + Adicionar Peça
          </button>
        </div>
        {aeronave.pecas.length === 0 ? (
          <p className="empty-message">Nenhuma peça associada.</p>
        ) : (
          <ul className="detalhes-list">
            {aeronave.pecas.map((peca, index) => (
              <li key={index}>
                {peca.nome} ({peca.fornecedor}) - <strong>Status: {peca.status}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="detalhes-card">
        <div className="card-header-actions">
          <h3>Etapas de Produção</h3>
          <button 
            className="button-primary-small"
            onClick={() => setIsModalEtapaOpen(true)}
          >
            + Adicionar Etapa
          </button>
        </div>
        {aeronave.etapas.length === 0 ? (
          <p className="empty-message">Nenhuma etapa definida.</p>
        ) : (
          <ul className="detalhes-list">
            {aeronave.etapas.map((etapa, index) => {
              const nomesResponsaveis = etapa.responsaveisIds.map(id => {
                const func = funcionarios.find(f => f.id === id);
                return func ? func.nome : '?';
              }).join(', ');

              return (
                <li key={index}>
                  {etapa.nome} - <strong>Status: {etapa.status}</strong>
                  <br />
                  <small>Responsáveis: {nomesResponsaveis || 'Nenhum'}</small>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="detalhes-card">
        <div className="card-header-actions">
          <h3>Testes de Qualidade</h3>
          <button 
            className="button-primary-small"
            onClick={() => setIsModalTesteOpen(true)}
          >
            + Adicionar Teste
          </button>
        </div>
        {aeronave.testes.length === 0 ? (
          <p className="empty-message">Nenhum teste realizado.</p>
        ) : (
          <ul className="detalhes-list">
            {aeronave.testes.map((teste, index) => (
              <li key={index}>
                Teste {teste.tipo}: <strong>{teste.resultado || 'Pendente'}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal 
        titulo="Adicionar Nova Peça"
        isOpen={isModalPecaOpen}
        onClose={() => setIsModalPecaOpen(false)}
      >
        <FormAdicionarPeca 
          codigoAeronave={aeronave.codigo}
          onClose={() => setIsModalPecaOpen(false)}
        />
      </Modal>

      <Modal 
        titulo="Adicionar Nova Etapa"
        isOpen={isModalEtapaOpen}
        onClose={() => setIsModalEtapaOpen(false)}
      >
        <FormAdicionarEtapa
          codigoAeronave={aeronave.codigo}
          onClose={() => setIsModalEtapaOpen(false)}
        />
      </Modal>

      <Modal 
        titulo="Adicionar Novo Teste"
        isOpen={isModalTesteOpen}
        onClose={() => setIsModalTesteOpen(false)}
      >
        <FormAdicionarTeste
          codigoAeronave={aeronave.codigo}
          onClose={() => setIsModalTesteOpen(false)}
        />
      </Modal>

    </div>
  );
};