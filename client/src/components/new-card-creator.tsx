import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useOutsideDetector } from '../hooks';
import { Button, Input, Popover } from 'antd';
import { GoalParams } from '../hooks/use-manager';
import { FlatButton } from './buttons';
import * as CONSTANTS from '../constants';

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
  onAdd: (goal: GoalParams) => void;
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
