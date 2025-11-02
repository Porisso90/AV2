// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import './LoginPage.css';

export const LoginPage = () => {
  // Estados locais para controlar os campos do formulário
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  // Hooks do React e do Contexto
  const { fazerLogin } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página
    setError(''); // Limpa erros antigos

    // Tenta fazer o login usando a função do nosso Contexto
    const sucesso = fazerLogin(usuario, senha);

    if (sucesso) {
      // Se for bem-sucedido, navega para o dashboard
      navigate('/dashboard');
    } else {
      // Se falhar, mostra uma mensagem de erro
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>AeroCode</h2>
        <p>Gestão de Produção de Aeronaves</p>
        
        <div className="form-group">
          <label htmlFor="usuario">Usuário</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
};