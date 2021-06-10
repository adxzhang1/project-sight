import React, { FC } from 'react';
import styled from 'styled-components';
import * as CONSTANTS from '../../../constants';

const getColor = (progress: number) => {
  if (progress < 0.5) return CONSTANTS.YELLOW_COLOR;

  if (progress < 0.8) return CONSTANTS.GREEN_YELLOW_COLOR;
  return CONSTANTS.GREEN_COLOR;
};

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
  background-color: ${({ progress }) => getColor(progress)};
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
