import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { useAuth } from './auth/AuthContext';
import { Button } from './components/ui';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { CardsPage } from './pages/CardsPage';
import { LoginPage } from './pages/LoginPage';
import { StudyPage } from './pages/StudyPage';

function Layout() {
  const { user, logout } = useAuth();
  const online = useOnlineStatus();
  return (
    <>
      <nav style={{ display: 'flex', gap: 16, padding: 16, alignItems: 'center', fontFamily: 'system-ui' }}>
        <Link to="/">Cards</Link>
        <Link to="/estudar">Estudar</Link>
        <span style={{ marginLeft: 'auto' }}>
          {online ? '🟢 online' : '🔴 offline'} · {user?.name}
        </span>
        <Button $variant="ghost" onClick={logout}>
          Sair
        </Button>
      </nav>
      <Outlet />
    </>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<CardsPage />} />
          <Route path="/estudar" element={<StudyPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
