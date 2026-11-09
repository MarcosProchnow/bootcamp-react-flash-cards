import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button, Field, Page } from '../components/ui';

export function LoginPage() {
  const { user, login } = useAuth();
  const [name, setName] = useState('');

  if (user) return <Navigate to="/" replace />;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim()) login(name);
  }

  return (
    <Page>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit}>
        <Field>
          Nome
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Button type="submit" disabled={!name.trim()}>
          Entrar
        </Button>
      </form>
    </Page>
  );
}
