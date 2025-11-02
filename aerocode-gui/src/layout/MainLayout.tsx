import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const MainLayout = () => {
  const { funcionarioLogado, fazerLogout } = useAppContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    fazerLogout();
    navigate('/');
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
        </ul>
        <div className="sidebar-footer">
          <button onClick={handleLogout}>Sair</button>
        </div>
      </nav>
      
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};