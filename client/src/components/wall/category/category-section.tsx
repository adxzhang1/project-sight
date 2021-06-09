import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../../types';
import {
  CreateGoalParams,
  UpdateCategoryParams,
  UpdateGoalParams,
} from '../../../hooks';
import { GoalCard, OpenNewCardButton } from './card';
import { Spacer } from '../../layout';
import { OpenCategoryActionsButton } from './category-actions';
import { UpdateCategoryModal } from './update-category';

const GoalsBase = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
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
  addGoal: (goal: CreateGoalParams) => any;
  deleteGoal: (goalId: string) => any;
  updateGoal: (goalId: string, params: UpdateGoalParams) => any;
  deleteCategory: () => any;
  updateCategory: (params: UpdateCategoryParams) => any;
}

export const CategorySection: FC<CategorySectionProps> = ({
  category,
  addGoal,
  deleteGoal,
  updateGoal,
  deleteCategory,
  updateCategory,
}) => {
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <React.Fragment>
      <CategorySectionBase>
        <CategorySectionHeader>
          <h3>{category.name}</h3>
          <Spacer width="1rem" />
          <OpenCategoryActionsButton
            onEdit={() => {
              setIsUpdateOpen(true);
            }}
            onDelete={deleteCategory}
          />
        </CategorySectionHeader>

        <Spacer height="1rem" />

        <GoalsBase>
          {category.goals.map((goal) => (
            <GoalCard
              key={goal._id}
              goal={goal}
              onUpdate={(params) => {
                updateGoal(goal._id, params);
              }}
              onDelete={() => deleteGoal(goal._id)}
            />
          ))}
          <OpenNewCardButton
            isOpen={isNewOpen}
            onClick={() => setIsNewOpen(true)}
            onAdd={(goal) => {
              setIsNewOpen(false);
              addGoal(goal);
            }}
            onCancel={() => setIsNewOpen(false)}
          />
        </GoalsBase>
      </CategorySectionBase>

      <UpdateCategoryModal
        category={category}
        visible={isUpdateOpen}
        onCancel={() => setIsUpdateOpen(false)}
        onSubmit={(params) => {
          updateCategory(params);
          setIsUpdateOpen(false);
        }}
      />
    </React.Fragment>
  );
};
