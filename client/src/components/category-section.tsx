import React, { FC } from 'react';
import { Category } from '../types';
import { GoalCard } from './goal-card';

interface CategorySectionProps {
  category: Category;
}

export const CategorySection: FC<CategorySectionProps> = ({ category }) => {
  return (
    <div>
      {category.goals.map((goal) => (
        <GoalCard goal={goal} />
      ))}
    </div>
  );
};
