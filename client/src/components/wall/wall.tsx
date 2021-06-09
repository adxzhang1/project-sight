import React from 'react';
import { CategorySection, OpenNewCategoryButton } from './category';
import { useManager, useAuthRedirect } from '../../hooks';

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
  } = useManager();

  return (
    <div>
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
        </React.Fragment>
      )}
    </div>
  );
};
