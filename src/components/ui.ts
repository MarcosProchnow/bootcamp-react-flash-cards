import styled, { css } from 'styled-components';

export const Page = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: system-ui, sans-serif;
`;

export const Button = styled.button<{ $variant?: 'primary' | 'danger' | 'ghost' }>`
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.95rem;
  ${({ $variant = 'primary' }) =>
    $variant === 'primary'
      ? css`background: #2563eb; color: #fff;`
      : $variant === 'danger'
        ? css`background: #dc2626; color: #fff;`
        : css`background: transparent; color: #2563eb; border-color: #2563eb;`}

  &:hover:not(:disabled) {
    filter: brightness(0.92);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  font-weight: 600;

  input,
  textarea {
    padding: 8px;
    border: 1px solid #94a3b8;
    border-radius: 6px;
    font: inherit;
    font-weight: 400;
  }
`;

export const ErrorText = styled.p`
  color: #dc2626;
  margin: 0 0 12px;
`;
