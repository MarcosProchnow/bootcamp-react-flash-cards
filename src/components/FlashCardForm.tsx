import { useRef, useState, type FormEvent } from 'react';
import type { NewFlashCard } from '../types';
import { Button, ErrorText, Field } from './ui';

interface Props {
  initial?: NewFlashCard;
  submitLabel: string;
  onSubmit: (data: NewFlashCard) => void;
  onCancel?: () => void;
}

export function FlashCardForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [error, setError] = useState('');
  const titleRef = useRef<HTMLInputElement>(null); // useRef: acesso direto ao DOM

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (title.trim().length < 3 || description.trim().length < 3) {
      setError('Título e descrição precisam ter ao menos 3 caracteres.');
      titleRef.current?.focus();
      return;
    }
    onSubmit({ title, description });
    if (!initial) {
      setTitle('');
      setDescription('');
    }
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field>
        Título
        <input ref={titleRef} value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field>
        Descrição
        <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      {error && <ErrorText role="alert">{error}</ErrorText>}
      <Button type="submit">{submitLabel}</Button>{' '}
      {onCancel && (
        <Button type="button" $variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </form>
  );
}
