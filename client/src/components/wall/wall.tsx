import React from 'react';
import { CategorySection, CategorySectionBase } from './category-section';
import { useManager } from '../../hooks';
import { NewCategoryCreator } from './new-category-creator';
import { Popover } from 'antd';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import * as CONSTANTS from '../../constants';
import { useAuthRedirect } from '../../hooks/use-auth';

const AddCategoryBase = styled(CategorySectionBase)`
  * {
    margin: 0;
  }

  display: inline-flex;
  align-items: center;
  background-color: ${CONSTANTS.PRIMARY_COLOR};
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  margin-top: 0;

  & > *:not(:last-child) {
    margin-right: 6px;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
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
    addCategory,
    deleteCategory,
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
              deleteCategory={() => deleteCategory(category._id)}
            />
          ))}
          <Popover
            visible={isNewOpen}
            placement="right"
            content={
              <NewCategoryCreator
                shouldFocus={isNewOpen}
                onAdd={(category) => {
                  setIsNewOpen(false);
                  addCategory(category);
                }}
                onCancel={() => setIsNewOpen(false)}
              />
            }
          >
            <AddCategoryBase onClick={() => setIsNewOpen(true)}>
              <p>New Category</p>
              <PlusOutlined />
            </AddCategoryBase>
          </Popover>
        </React.Fragment>
      )}
    </div>
  );
};
