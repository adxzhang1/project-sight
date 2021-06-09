import React, { FC } from 'react';
import styled from 'styled-components';
import { Category } from '../types';
import { GoalCard, GoalCardBase } from './goal-card';
import { useCategorySection } from '../hooks';
import { Button, Popover } from 'antd';
import { GoalParams } from '../hooks/use-manager';
import { NewCardCreator } from './new-card-creator';
import {
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Spacer } from './layout';
import * as CONSTANTS from '../constants';

const CategoryActionButton = styled(Button)`
  &:not(:last-child) {
    margin-right: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;

interface CategoryActionsProps {
  onDelete: () => void;
}

const CategoryActions: FC<CategoryActionsProps> = ({ onDelete }) => {
  return (
    <div>
      <CategoryActionButton shape="circle" size="small" onClick={() => {}}>
        <EditOutlined />
      </CategoryActionButton>
      <CategoryActionButton shape="circle" size="small" onClick={onDelete}>
        <DeleteOutlined />
      </CategoryActionButton>
    </div>
  );
};

const CategoryMoreButton = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const GoalsBase = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const AddGoalCard = styled(GoalCardBase)`
  background-color: ${CONSTANTS.SECONDARY_COLOR};
  color: white;
  align-self: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  white-space: nowrap;

  & > *:not(:last-child) {
    margin-right: 6px;
  }
`;

export const CategorySectionBase = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  padding: 1rem 1.5rem;
  margin: 1rem 1rem;
  border-radius: 4px;
`;

const CategorySectionHeader = styled.div`
  * {
    margin: 0;
  }

  display: flex;
  align-items: center;
`;

interface CategorySectionProps {
  category: Category;
  addGoal: (goal: GoalParams) => void;
  deleteGoal: (goalId: string) => void;
  deleteCategory: () => void;
}

export const CategorySection: FC<CategorySectionProps> = ({
  category,
  addGoal,
  deleteGoal,
  deleteCategory,
}) => {
  const { isNewOpen, setIsNewOpen } = useCategorySection();

  return (
    <CategorySectionBase>
      <CategorySectionHeader>
        <h3>{category.name}</h3>
        <Spacer width="1rem" />
        <Popover
          trigger="click"
          placement="right"
          content={<CategoryActions onDelete={deleteCategory} />}
        >
          <CategoryMoreButton>
            <MoreOutlined />
          </CategoryMoreButton>
        </Popover>
      </CategorySectionHeader>

      <Spacer height="1rem" />

      <GoalsBase>
        {category.goals.map((goal) => (
          <GoalCard
            key={goal._id}
            goal={goal}
            onDelete={() => deleteGoal(goal._id)}
          />
        ))}
        <Popover
          visible={isNewOpen}
          placement="left"
          content={
            <NewCardCreator
              shouldFocus={isNewOpen}
              onAdd={(goal) => {
                setIsNewOpen(false);
                addGoal(goal);
              }}
              onCancel={() => setIsNewOpen(false)}
            />
          }
        >
          <AddGoalCard onClick={() => setIsNewOpen(true)}>
            <p>Add Goal</p>
            <PlusOutlined />
          </AddGoalCard>
        </Popover>
      </GoalsBase>
    </CategorySectionBase>
  );
};
