import type { FlashCardData, NewFlashCard } from '../types';

const KEY = 'flashcards';

const SEED: FlashCardData[] = [
  {
    id: 'seed-1',
    title: 'O que é JSX?',
    description: 'Extensão de sintaxe do JavaScript que descreve a UI; é compilada para chamadas de função.',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'seed-2',
    title: 'Para que serve a prop key?',
    description: 'Identifica itens de uma lista para o React reconciliar o DOM sem recriar elementos.',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
];

/** Repositório persistido em localStorage; mesma interface de uma API REST. */
export const flashCardsRepository = {
  list(): FlashCardData[] {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === null) return [...SEED];
      return JSON.parse(raw) as FlashCardData[];
    } catch {
      return [...SEED];
    }
  },

  save(cards: FlashCardData[]): void {
    localStorage.setItem(KEY, JSON.stringify(cards));
  },

  create(data: NewFlashCard): FlashCardData {
    return {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      description: data.description.trim(),
      createdAt: new Date().toISOString(),
    };
  },
};
