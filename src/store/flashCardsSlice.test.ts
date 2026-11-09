import reducer, { added, initialState, removed, updated } from './flashCardsSlice';

describe('flashCardsSlice', () => {
  it('adiciona um card com id e título normalizado', () => {
    const state = reducer(initialState, added({ title: '  React  ', description: 'Lib de UI' }));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].title).toBe('React');
    expect(state.items[0].id).toBeTruthy();
  });

  it('atualiza e remove', () => {
    let state = reducer(initialState, added({ title: 'A', description: 'B' }));
    const card = state.items[0];
    state = reducer(state, updated({ ...card, title: 'Novo' }));
    expect(state.items[0].title).toBe('Novo');
    state = reducer(state, removed(card.id));
    expect(state.items).toHaveLength(0);
  });
});
