import { useReducer } from 'react';
import { FlashCard } from '../components/FlashCard';
import { Button, Page } from '../components/ui';
import { useAppSelector } from '../store/store';
import { initialStudyState, studyReducer } from '../study/studyReducer';

/** Sessão de estudo gerenciada por useReducer. */
export function StudyPage() {
  const cards = useAppSelector((s) => s.flashCards.items);
  const [state, dispatch] = useReducer(studyReducer, initialStudyState);
  const total = cards.length;
  const current = cards[state.index];

  if (!current) {
    return (
      <Page>
        <h1>Estudar</h1>
        <p>Nenhum card cadastrado ainda.</p>
      </Page>
    );
  }

  return (
    <Page>
      <h1>Estudar</h1>
      <p>
        Card {state.index + 1} de {total} · Sabidos: {state.known.length}
      </p>
      <FlashCard title={current.title} description={current.description} revealed={state.revealed} />
      {!state.revealed ? (
        <Button onClick={() => dispatch({ type: 'reveal' })}>Mostrar resposta</Button>
      ) : (
        <>
          <Button onClick={() => dispatch({ type: 'markKnown', id: current.id, total })}>Sei</Button>{' '}
          <Button $variant="ghost" onClick={() => dispatch({ type: 'next', total })}>
            Ainda não sei
          </Button>
        </>
      )}{' '}
      <Button $variant="ghost" onClick={() => dispatch({ type: 'restart' })}>
        Reiniciar
      </Button>
    </Page>
  );
}
