export interface StudyState {
  index: number;
  revealed: boolean;
  known: string[];
}

export type StudyAction =
  | { type: 'reveal' }
  | { type: 'next'; total: number }
  | { type: 'markKnown'; id: string; total: number }
  | { type: 'restart' };

export const initialStudyState: StudyState = { index: 0, revealed: false, known: [] };

export function studyReducer(state: StudyState, action: StudyAction): StudyState {
  switch (action.type) {
    case 'reveal':
      return { ...state, revealed: true };
    case 'next':
      return { ...state, revealed: false, index: action.total === 0 ? 0 : (state.index + 1) % action.total };
    case 'markKnown': {
      const known = state.known.includes(action.id) ? state.known : [...state.known, action.id];
      return { index: action.total === 0 ? 0 : (state.index + 1) % action.total, revealed: false, known };
    }
    case 'restart':
      return initialStudyState;
  }
}
