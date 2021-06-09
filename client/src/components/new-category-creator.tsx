import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useOutsideDetector } from '../hooks';
import { Input } from 'antd';
import { CategoryParams } from '../hooks/use-manager';
import { FlatButton } from './buttons';
import * as CONSTANTS from '../constants';

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
  onAdd: (category: CategoryParams) => void;
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
