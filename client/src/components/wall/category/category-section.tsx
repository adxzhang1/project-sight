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
import { ProgressBar } from '../../shared/progress-bar';

const GoalsBase = styled.div``;

const DragContainer = styled.div`
  padding: 4px 0;
`;

export const CategorySectionBase = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  padding: 0.7rem 1rem 1.2rem 1rem;
  margin: 0 0.5rem;
  border-radius: 4px;
  flex-shrink: 0;
  width: 20rem;
  max-width: 24rem;
`;

const CategorySectionHeader = styled.div`
  * {
    margin: 0;
  }

  display: flex;
  align-items: center;

  h3 {
    overflow-wrap: anywhere;
  }
`;

const HeaderLeft = styled.div`
  flex: 3;
`;

const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 2px;
  }
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

  const progress =
    category.goals.reduce(
      (prev, { isComplete }) => (isComplete ? prev + 1 : prev),
      0
    ) / category.goals.length;

  return (
    <React.Fragment>
      <CategorySectionBase>
        <CategorySectionHeader>
          <HeaderLeft>
            <h3>{category.name}</h3>
            <Spacer width=".5rem" />
          </HeaderLeft>
          <HeaderRight>
            <OpenCategoryActionsButton
              onEdit={() => {
                setIsUpdateOpen(true);
              }}
              onDelete={deleteCategory}
            />
            <ProgressBar progress={progress} />
          </HeaderRight>
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
