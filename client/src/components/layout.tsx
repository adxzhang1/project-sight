import styled from 'styled-components';

interface SpacerProps {
  height?: string;
  width?: string;
}

export const Spacer = styled.div<SpacerProps>`
  margin-top: ${(props) => props.height || 0} !important;
  margin-left: ${(props) => props.width || 0} !important;
`;
