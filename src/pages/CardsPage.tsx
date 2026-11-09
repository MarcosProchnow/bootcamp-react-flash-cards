import { useState } from 'react';
import { FlashCardForm } from '../components/FlashCardForm';
import { Button, Page } from '../components/ui';
import { added, removed, updated } from '../store/flashCardsSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

/** CRUD de flash cards usando Redux Toolkit. */
export function CardsPage() {
  const cards = useAppSelector((s) => s.flashCards.items);
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <Page>
      <h1>Flash cards</h1>
      <h2>Novo card</h2>
      <FlashCardForm submitLabel="Criar" onSubmit={(data) => dispatch(added(data))} />

      <h2>Meus cards ({cards.length})</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cards.map((card) => (
          <li key={card.id} style={{ marginBottom: 16 }}>
            {editingId === card.id ? (
              <FlashCardForm
                initial={card}
                submitLabel="Salvar"
                onSubmit={(data) => {
                  dispatch(updated({ ...card, title: data.title.trim(), description: data.description.trim() }));
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <strong>{card.title}</strong>
                <p>{card.description}</p>
                <Button $variant="ghost" onClick={() => setEditingId(card.id)}>
                  Editar
                </Button>{' '}
                <Button $variant="danger" onClick={() => dispatch(removed(card.id))}>
                  Excluir
                </Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </Page>
  );
}
