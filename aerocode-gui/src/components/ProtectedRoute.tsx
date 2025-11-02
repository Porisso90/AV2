// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const ProtectedRoute = () => {
    // Busca o funcionário logado no nosso estado global
    const { funcionarioLogado } = useAppContext();

    if (!funcionarioLogado) {
        // Se não houver funcionário logado, redireciona para a página de login
        return <Navigate to="/" replace />;
    }

    // Se estiver logado, mostra a página que o utilizador tentou aceder
    return <Outlet />;
};