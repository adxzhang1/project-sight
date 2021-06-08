import React, { FC } from 'react';
import { Goal } from '../types';

interface GoalCardProps {
  goal: Goal;
}

export const GoalCard: FC<GoalCardProps> = ({ goal }) => {
  return (
    <div>
      <p>{goal.title}</p>
      {goal.description && <p>{goal.description}</p>}
    </div>
  );
};
