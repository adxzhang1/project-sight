import React, { FC } from 'react';
import styled from 'styled-components';
import { Category } from '../../../types';
import { Spacer } from '../../layout';
import { ProgressBar } from '../../shared/progress-bar';

const SummaryItemBase = styled.div`
  * {
    margin: 0;
  }

  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
`;

const Title = styled.div`
  font-weight: 700;
`;

const Percentage = styled.div`
  font-size: 0.6rem;
  align-self: flex-end;
  display: flex;
  color: grey;
`;

interface SummaryItemProps {
  category: Category;
}

export const SummaryItem: FC<SummaryItemProps> = ({ category }) => {
  const nComplete = category.goals.reduce(
    (prev, { isComplete }) => (isComplete ? prev + 1 : prev),
    0
  );
  const progress = nComplete / category.goals.length;

  return (
    <SummaryItemBase>
      <Title>{category.name}</Title>
      <Spacer height="3px" />
      <Percentage>
        <p>{progress ? (progress * 100).toFixed(1) : '0.00'}%</p>
        <Spacer width="2px" />
        <p>{`(${nComplete}/${category.goals.length})`}</p>
      </Percentage>
      <ProgressBar progress={progress} />
    </SummaryItemBase>
  );
};
