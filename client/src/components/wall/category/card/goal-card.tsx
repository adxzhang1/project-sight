import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';
import { Goal } from '../../../../types';
import { UpdateCardModal } from './update-card';
import { UpdateGoalParams } from '../../../../hooks';
import { GoalCardActions } from './card-actions';
import { CheckOutlined } from '@ant-design/icons';

export const GoalCardBase = styled.div`
  * {
    margin: 0;
  }

  padding: 0.4rem 0.8rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }

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
            isComplete={goal.isComplete}
            onCheck={() => onUpdate({ isComplete: !goal.isComplete })}
            onEdit={() => setIsDetailsOpen(true)}
            onDelete={onDelete}
          />
        }
        placement="right"
      >
        <GoalCardBase onClick={() => setIsDetailsOpen(true)}>
          <p style={{ overflowWrap: 'anywhere' }}>{goal.title}</p>
          {goal.isComplete && <CheckOutlined />}
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
