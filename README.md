# React Flash Cards

Projeto desenvolvido como estudo do **Bootcamp Desenvolvedor(a) React** (XP Educação / IGTI), parte da Pós-Graduação em Desenvolvimento Full Stack e Full Cycle.

Aplicação de flash cards para estudo: cadastro (CRUD) de cards e sessão de estudo, com login simulado e rotas protegidas. Código próprio, escrito a partir da ementa do curso.

## Stack

React 18 · TypeScript · Vite · React Router · Redux Toolkit · Styled Components · Vitest + Testing Library

## Como rodar

Requer Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # testes
npm run build      # typecheck + build de produção
```

Para entrar, informe qualquer nome (autenticação simulada). Os dados ficam no `localStorage`.

## Onde cada tópico do curso aparece

| Tópico (módulo) | Onde |
|---|---|
| Componentização, props, composition (M2) | `src/components/FlashCard.tsx`, `ui.ts` |
| `useState`, eventos, formulários e validação (M2/M3) | `src/components/FlashCardForm.tsx` |
| `useEffect` com cleanup, hook customizado (M2/M3) | `src/hooks/useOnlineStatus.ts` |
| `useRef` (M3) | foco no campo inválido em `FlashCardForm.tsx` |
| TypeScript (M3) | `src/types.ts` e todo o código |
| React Router, rotas protegidas (M3) | `src/App.tsx`, `src/auth/ProtectedRoute.tsx` |
| Autenticação e API Context (M3) | `src/auth/AuthContext.tsx` |
| `useMemo`, `useCallback`, `React.memo` (M3) | `AuthContext.tsx`, `FlashCard.tsx` |
| `useReducer` (M3) | `src/study/studyReducer.ts`, `src/pages/StudyPage.tsx` |
| Redux Toolkit (M3) | `src/store/` |
| Styled Components, estilos por props (M4) | `src/components/ui.ts` |
| Testes: Jest-like (Vitest), Testing Library, TDD (M4) | `*.test.ts(x)` |
| Deploy (M4) | build estático (`dist/`) publicável na Vercel ou Netlify |

Fora do escopo desta versão: Next.js (SSR/SSG), react-query/SWR e Cypress; ficam como evolução (ver abaixo).

## Próximos passos

- Back end real (por exemplo, a API do bootcamp Node.js) com SWR ou react-query.
- Versão Next.js com SSG para a lista de cards.
- Testes E2E com Cypress.
- Deploy na Vercel.

## Estrutura

```
src/
├── auth/        Context de autenticação e rota protegida
├── components/  FlashCard, FlashCardForm e componentes estilizados
├── hooks/       Hooks customizados
├── pages/       Login, Cards (CRUD), Study
├── services/    Repositório (localStorage)
├── store/       Redux Toolkit (slice + store)
└── study/       Reducer da sessão de estudo
```
