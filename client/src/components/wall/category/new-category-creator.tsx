import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Input, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useOutsideDetector, CreateCategoryParams } from '../../../hooks';
import { FlatButton } from '../buttons';
import * as CONSTANTS from '../../../constants';
import { CategorySectionBase } from './category-section';

// --- New Category Display ---
const NewCategoryInput = styled(Input)`
  max-width: 20rem;
`;

const NewCategoryCreatorBack = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const NewCategoryButton = styled(FlatButton)`
  background-color: ${CONSTANTS.PRIMARY_COLOR};
  color: white;
  font-weight: bold;
`;

interface NewCategoryCreatorProps {
  onAdd: (category: CreateCategoryParams) => void;
  onCancel: () => void;
  shouldFocus?: boolean;
}

export const NewCategoryCreator: FC<NewCategoryCreatorProps> = ({
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

  const [name, setName] = useState('');

  const add = () => {
    onAdd({ name });
    setName('');
  };

  return (
    <NewCategoryCreatorBack ref={ref}>
      <NewCategoryInput
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a name"
        onKeyDown={(e) => {
          if (e.key.toLowerCase() == 'enter') {
            add();
          }
        }}
      />
      <NewCategoryButton
        onClick={add}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() == 'enter') {
            add();
          }
        }}
        tabIndex={0}
      >
        Add
      </NewCategoryButton>
    </NewCategoryCreatorBack>
  );
};

// --- Open New Category Display ---
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

interface OpenNewCategoryButtonProps {
  isOpen: boolean;
  onClick: () => any;
  onAdd: (category: CreateCategoryParams) => any;
  onCancel: () => any;
}

export const OpenNewCategoryButton: FC<OpenNewCategoryButtonProps> = ({
  isOpen,
  onClick,
  onAdd,
  onCancel,
}) => {
  return (
    <Popover
      visible={isOpen}
      placement="right"
      content={
        <NewCategoryCreator
          shouldFocus={isOpen}
          onAdd={onAdd}
          onCancel={onCancel}
        />
      }
    >
      <AddCategoryBase onClick={onClick}>
        <p>New Category</p>
        <PlusOutlined />
      </AddCategoryBase>
    </Popover>
  );
};
