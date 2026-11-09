import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import flashCards, { loaded } from './flashCardsSlice';
import { flashCardsRepository } from '../services/flashCardsRepository';

export function makeStore() {
  const store = configureStore({
    reducer: { flashCards },
    preloadedState: { flashCards: { items: flashCardsRepository.list() } },
  });
  // Persiste a cada mudança (equivale ao "salvar no back end" da API).
  store.subscribe(() => flashCardsRepository.save(store.getState().flashCards.items));
  return store;
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { loaded };
