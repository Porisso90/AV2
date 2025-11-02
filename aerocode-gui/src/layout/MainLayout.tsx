// src/layout/MainLayout.tsx
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const MainLayout = () => {
  // 1. Obter a função de logout e o funcionário
  const { funcionarioLogado, fazerLogout } = useAppContext();
  const navigate = useNavigate();

  // 2. Implementar a função de logout
  const handleLogout = () => {
    fazerLogout();
    navigate('/'); // Redireciona para o login após sair
  };

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h3>AeroCode</h3>
          <small>Bem-vindo, {funcionarioLogado?.nome}</small>
        </div>
        <ul className="nav-list">
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          {/* Adicionaremos mais links aqui (ex: /admin/funcionarios) */}
        </ul>
        <div className="sidebar-footer">
          {/* 3. Ligar a função ao clique do botão */}
          <button onClick={handleLogout}>Sair</button>
        </div>
      </nav>
      
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};