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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const GoalsBase = styled.div``;

const DragContainer = styled.div`
  padding: 4px 0;
`;

export const CategorySectionBase = styled.div`
  background-color: rgba(0, 0, 0, 0.01);
  padding: 0.7rem 1rem;
  margin: 0 1rem;
  border-radius: 4px;
  min-width: 20rem;
  max-width: 20rem;
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
  reorderGoals: (source: number, dest: number) => any;
}

export const CategorySection: FC<CategorySectionProps> = ({
  category,
  addGoal,
  deleteGoal,
  updateGoal,
  deleteCategory,
  updateCategory,
  reorderGoals,
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

        <Spacer height=".5rem" />

        <GoalsBase>
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) {
                return;
              }

              reorderGoals(result.source.index, result.destination.index);
            }}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {category.goals.map((goal, index) => (
                    <Draggable
                      key={goal._id}
                      draggableId={goal._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <DragContainer>
                            <GoalCard
                              key={goal._id}
                              goal={goal}
                              onUpdate={(params) => {
                                updateGoal(goal._id, params);
                              }}
                              onDelete={() => deleteGoal(goal._id)}
                            />
                          </DragContainer>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Spacer height="1rem" />
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
