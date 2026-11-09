import { memo } from 'react';
import styled from 'styled-components';

const Card = styled.article<{ $revealed: boolean }>`
  border: 2px solid ${({ $revealed }) => ($revealed ? '#16a34a' : '#2563eb')};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  background: #fff;
  transition: border-color 0.2s;

  h3 {
    margin: 0 0 8px;
  }
  p {
    margin: 0;
  }
`;

interface Props {
  title: string;
  description: string;
  revealed: boolean;
}

/** Componente de apresentação; memo evita re-render quando as props não mudam. */
function FlashCardBase({ title, description, revealed }: Props) {
  return (
    <Card $revealed={revealed} aria-label="flash card">
      <h3>{title}</h3>
      {revealed ? <p>{description}</p> : <p aria-hidden>?</p>}
    </Card>
  );
}

export const FlashCard = memo(FlashCardBase);
