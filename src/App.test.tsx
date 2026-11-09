import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { AuthProvider } from './auth/AuthContext';
import { makeStore } from './store/store';

function setup(path = '/') {
  return render(
    <Provider store={makeStore()}>
      <AuthProvider>
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      </AuthProvider>
    </Provider>,
  );
}

describe('App', () => {
  it('redireciona para login quando não autenticado', () => {
    setup('/');
    expect(screen.getByRole('heading', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('faz login, cria e exclui um card', async () => {
    const user = userEvent.setup();
    setup('/');

    await user.type(screen.getByLabelText('Nome'), 'Ana');
    await user.click(screen.getByRole('button', { name: 'Entrar' }));
    expect(await screen.findByRole('heading', { name: 'Flash cards' })).toBeInTheDocument();

    await user.type(screen.getByLabelText('Título'), 'Hooks');
    await user.type(screen.getByLabelText('Descrição'), 'Funções que usam recursos do React');
    await user.click(screen.getByRole('button', { name: 'Criar' }));
    expect(screen.getByText('Hooks')).toBeInTheDocument();

    const [excluir] = screen.getAllByRole('button', { name: 'Excluir' }).slice(-1);
    await user.click(excluir);
    expect(screen.queryByText('Hooks')).not.toBeInTheDocument();
  });

  it('valida o formulário', async () => {
    const user = userEvent.setup();
    localStorage.setItem('session', JSON.stringify({ name: 'Ana' }));
    setup('/');
    await user.click(screen.getByRole('button', { name: 'Criar' }));
    expect(screen.getByRole('alert')).toHaveTextContent('ao menos 3 caracteres');
  });

  it('revela a resposta na tela de estudo', async () => {
    const user = userEvent.setup();
    localStorage.setItem('session', JSON.stringify({ name: 'Ana' }));
    setup('/estudar');
    expect(screen.queryByText(/Extensão de sintaxe/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Mostrar resposta' }));
    expect(screen.getByText(/Extensão de sintaxe/)).toBeInTheDocument();
  });
});
