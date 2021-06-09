import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';
import { Goal } from '../../../../types';
import { UpdateCardModal } from './update-card';
import { UpdateGoalParams } from '../../../../hooks';
import { GoalCardActions } from './card-actions';

export const GoalCardBase = styled.div`
  * {
    margin: 0;
  }

  padding: 0.4rem 01.2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

interface GoalCardProps {
  goal: Goal;
  onUpdate: (params: UpdateGoalParams) => void;
  onDelete: () => void;
}

export const GoalCard: FC<GoalCardProps> = ({ goal, onUpdate, onDelete }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <React.Fragment>
      <Popover
        content={
          <GoalCardActions
            onEdit={() => setIsDetailsOpen(true)}
            onDelete={onDelete}
          />
        }
        placement="right"
      >
        <GoalCardBase onClick={() => setIsDetailsOpen(true)}>
          <p style={{ overflowWrap: 'anywhere' }}>{goal.title}</p>
        </GoalCardBase>
      </Popover>
      <UpdateCardModal
        goal={goal}
        visible={isDetailsOpen}
        onCancel={() => setIsDetailsOpen(false)}
        onSubmit={(params) => {
          onUpdate(params);
          setIsDetailsOpen(false);
        }}
      />
    </React.Fragment>
  );
};
