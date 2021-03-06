import React from 'react';
import { CategorySection, OpenNewCategoryButton } from './category';
import { useManager, useAuthRedirect } from '../../hooks';
import styled from 'styled-components';
import { Summary } from './summary';

const WallBase = styled.div`
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
  padding-bottom: 6rem;
`;

export const Wall = () => {
  useAuthRedirect();

  const {
    loading,
    isNewOpen,
    setIsNewOpen,
    categories,
    addGoal,
    deleteGoal,
    updateGoal,
    addCategory,
    deleteCategory,
    updateCategory,
    reorderGoals,
  } = useManager();

  return (
    <WallBase>
      {loading ? (
        <p>loading...</p>
      ) : (
        <React.Fragment>
          {categories.map((category) => (
            <CategorySection
              key={category._id}
              category={category}
              addGoal={(goal) => addGoal(goal, category._id)}
              deleteGoal={(goalId) => deleteGoal(goalId, category._id)}
              updateGoal={(goalId, params) =>
                updateGoal(goalId, params, category._id)
              }
              deleteCategory={() => deleteCategory(category._id)}
              updateCategory={(params) => updateCategory(category._id, params)}
              reorderGoals={(source, dest) =>
                reorderGoals(category._id, source, dest)
              }
            />
          ))}

          <OpenNewCategoryButton
            isOpen={isNewOpen}
            onClick={() => setIsNewOpen(true)}
            onAdd={(category) => {
              setIsNewOpen(false);
              addCategory(category);
            }}
            onCancel={() => setIsNewOpen(false)}
          />

          <Summary categories={categories} />
        </React.Fragment>
      )}
    </WallBase>
  );
};
