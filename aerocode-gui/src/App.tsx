// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layout/MainLayout';
import { CadastroAeronavePage } from './pages/CadastroAeronavePage';
import { AeronaveDetalhesPage } from './pages/AeronaveDetalhesPage';

import './layout/MainLayout.css';
import './pages/DashboardPage.css';
import './pages/LoginPage.css';
import './pages/CadastroAeronavePage.css';
import './pages/AeronaveDetalhesPage.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/aeronaves/nova" element={<CadastroAeronavePage />} />
          <Route path="/aeronave/:codigo" element={<AeronaveDetalhesPage />} />

        </Route>
      </Route>

    </Routes>
  )
}

export default App