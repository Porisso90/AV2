// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './layout/MainLayout';
import { CadastroAeronavePage } from './pages/CadastroAeronavePage';

// 1. Importar a nova página
import { AeronaveDetalhesPage } from './pages/AeronaveDetalhesPage';

// Importar os CSS
import './layout/MainLayout.css';
import './pages/DashboardPage.css';
import './pages/LoginPage.css';
import './pages/CadastroAeronavePage.css';
// 2. Importar o novo CSS
import './pages/AeronaveDetalhesPage.css';


function App() {
  return (
    <Routes>
      {/* Rota pública: Página de Login */}
      <Route path="/" element={<LoginPage />} />
      
      {/* Rotas protegidas agora usam o MainLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/aeronaves/nova" element={<CadastroAeronavePage />} />
          
          {/* 3. Adicionar a nova ROTA DINÂMICA */}
          <Route path="/aeronave/:codigo" element={<AeronaveDetalhesPage />} />

        </Route>
      </Route>

    </Routes>
  )
}

export default App