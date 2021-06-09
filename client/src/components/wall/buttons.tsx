import styled from 'styled-components';

interface FlatButtonProps {
  color?: string;
  backgroundColor?: string;
}

export const FlatButton = styled.div<FlatButtonProps>`
  display: inline-flex;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor || ''};
  color: ${({ color }) => color || ''};
  font-weight: bold;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
