import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

function setup() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/segredo']}>
        <Routes>
          <Route path="/login" element={<h1>Login</h1>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/segredo" element={<h1>Área restrita</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe('ProtectedRoute', () => {
  it('redireciona para /login sem sessão', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('renderiza a rota com sessão ativa', () => {
    localStorage.setItem('session', JSON.stringify({ name: 'Ana' }));
    setup();
    expect(screen.getByRole('heading', { name: 'Área restrita' })).toBeInTheDocument();
  });
});
