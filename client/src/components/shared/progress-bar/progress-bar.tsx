import React, { FC } from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  progress: number;
}

const ProgressBarBase = styled.div`
  position: relative;
  flex: 1;
`;

const ProgressBarBack = styled.div`
  height: 4px;
  border-radius: 2px;
  width: 100%;
  background-color: lightgray;
`;

interface ProgressBarFrontProps {
  progress: number;
}

const ProgressBarFront = styled.div<ProgressBarFrontProps>`
  height: 5px;
  border-radius: 2.5px;
  width: ${({ progress }) => progress * 100}%;
  background-color: #5fdfff;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
`;

export const ProgressBar: FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarBase>
      <ProgressBarBack />
      <ProgressBarFront progress={progress} />
    </ProgressBarBase>
  );
};
