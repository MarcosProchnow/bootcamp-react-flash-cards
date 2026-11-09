import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { flashCardsRepository } from '../services/flashCardsRepository';
import type { FlashCardData, NewFlashCard } from '../types';

export interface FlashCardsState {
  items: FlashCardData[];
}

export const initialState: FlashCardsState = { items: [] };

const slice = createSlice({
  name: 'flashCards',
  initialState,
  reducers: {
    loaded(state, action: PayloadAction<FlashCardData[]>) {
      state.items = action.payload;
    },
    added(state, action: PayloadAction<NewFlashCard>) {
      state.items.push(flashCardsRepository.create(action.payload));
    },
    updated(state, action: PayloadAction<FlashCardData>) {
      const i = state.items.findIndex((c) => c.id === action.payload.id);
      if (i >= 0) state.items[i] = action.payload;
    },
    removed(state, action: PayloadAction<string>) {
      state.items = state.items.filter((c) => c.id !== action.payload);
    },
  },
});

export const { loaded, added, updated, removed } = slice.actions;
export default slice.reducer;
