import { initialStudyState, studyReducer } from './studyReducer';

describe('studyReducer', () => {
  it('revela a resposta', () => {
    expect(studyReducer(initialStudyState, { type: 'reveal' }).revealed).toBe(true);
  });

  it('avança de forma circular e esconde a resposta', () => {
    const s = studyReducer({ index: 2, revealed: true, known: [] }, { type: 'next', total: 3 });
    expect(s).toEqual({ index: 0, revealed: false, known: [] });
  });

  it('marca como sabido sem duplicar', () => {
    let s = studyReducer(initialStudyState, { type: 'markKnown', id: 'a', total: 2 });
    s = studyReducer(s, { type: 'markKnown', id: 'a', total: 2 });
    expect(s.known).toEqual(['a']);
  });

  it('não quebra com lista vazia', () => {
    expect(studyReducer(initialStudyState, { type: 'next', total: 0 }).index).toBe(0);
  });

  it('reinicia', () => {
    expect(studyReducer({ index: 1, revealed: true, known: ['a'] }, { type: 'restart' })).toEqual(initialStudyState);
  });
});
