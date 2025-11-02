import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const ProtectedRoute = () => {
    const { funcionarioLogado } = useAppContext();

    if (!funcionarioLogado) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};