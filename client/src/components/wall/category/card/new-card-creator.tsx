import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Input, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useOutsideDetector, CreateGoalParams } from '../../../../hooks';
import { FlatButton } from '../../buttons';
import * as CONSTANTS from '../../../../constants';
import { GoalCardBase } from './goal-card';

// --- New card display ---
const NewCardInput = styled(Input)`
  max-width: 20rem;
`;

const NewCardCreatorBack = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const NewCardButton = styled(FlatButton)`
  background-color: ${CONSTANTS.SECONDARY_COLOR};
  color: white;
  font-weight: bold;
`;

interface NewCardCreatorProps {
  onAdd: (goal: CreateGoalParams) => void;
  onCancel: () => void;
  shouldFocus?: boolean;
}

export const NewCardCreator: FC<NewCardCreatorProps> = ({
  onAdd,
  onCancel,
  shouldFocus,
}) => {
  const ref = useRef<any>(null);
  useOutsideDetector(ref, onCancel);

  // focus onto input
  const inputRef = useRef<any>(null);
  useEffect(() => {
    // need to wait a little for ref
    const id = setTimeout(() => {
      if (inputRef.current && shouldFocus) {
        inputRef.current.focus();
      }
    }, 100);
    return () => {
      clearTimeout(id);
    };
  }, [shouldFocus]);

  const [title, setTitle] = useState('');

  const add = () => {
    onAdd({ title });
    setTitle('');
  };

  return (
    <NewCardCreatorBack ref={ref}>
      <NewCardInput
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() == 'enter') {
            add();
          }
        }}
        placeholder="Enter a title"
      />
      <NewCardButton
        onClick={add}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() == 'enter') {
            add();
          }
        }}
      >
        Add
      </NewCardButton>
    </NewCardCreatorBack>
  );
};

// --- New card button ---
const AddGoalCard = styled(GoalCardBase)`
  background-color: ${CONSTANTS.SECONDARY_COLOR};
  color: white;
  align-self: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  white-space: nowrap;
  margin-left: 0.5rem;

  & > *:not(:last-child) {
    margin-right: 6px;
  }
`;

interface OpenNewCardButtonProps {
  isOpen: boolean;
  onClick: () => any;
  onAdd: (category: CreateGoalParams) => any;
  onCancel: () => any;
}

export const OpenNewCardButton: FC<OpenNewCardButtonProps> = ({
  isOpen,
  onClick,
  onAdd,
  onCancel,
}) => {
  return (
    <Popover
      visible={isOpen}
      placement="left"
      content={
        <NewCardCreator
          shouldFocus={isOpen}
          onAdd={onAdd}
          onCancel={onCancel}
        />
      }
    >
      <AddGoalCard onClick={onClick}>
        <p>Add Goal</p>
        <PlusOutlined />
      </AddGoalCard>
    </Popover>
  );
};
