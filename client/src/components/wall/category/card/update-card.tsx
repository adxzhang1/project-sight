import React, { FC, useState } from 'react';
import { Input, Modal } from 'antd';
import styled from 'styled-components';
import { UpdateGoalParams } from '../../../../hooks';
import { Goal } from '../../../../types';
import { Spacer } from '../../../layout';
import { FlatButton } from '../../buttons';
import * as CONSTANTS from '../../../../constants';

const UpdateCardInput = styled(Input)`
  max-width: 80%;
`;

interface UpdateCardProps {
  goal: Goal;
  onSubmit: (params: UpdateGoalParams) => any;
}

export const UpdateCard: FC<UpdateCardProps> = ({ goal, onSubmit }) => {
  const [data, setData] = useState({
    title: goal.title,
    description: goal.description,
  });

  const update = (key: string, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const submit = () => {
    onSubmit(data);
  };

  return (
    <div>
      <UpdateCardInput
        value={data.title}
        onChange={(e) => update('title', e.target.value)}
        placeholder="title"
      />
      <Spacer height="1rem" />
      <Input.TextArea
        value={data.description}
        onChange={(e) => update('description', e.target.value)}
        placeholder="description"
      />
      <Spacer height="1rem" />
      <FlatButton
        color="white"
        backgroundColor={CONSTANTS.SECONDARY_COLOR}
        onClick={submit}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() == 'enter') {
            submit();
          }
        }}
      >
        Save
      </FlatButton>
    </div>
  );
};

interface UpdateCardModalProps {
  goal: Goal;
  visible: boolean;
  onCancel: () => any;
  onSubmit: (params: UpdateGoalParams) => any;
}

export const UpdateCardModal: FC<UpdateCardModalProps> = ({
  goal,
  visible,
  onCancel,
  onSubmit,
}) => {
  return (
    <Modal visible={visible} footer={null} onCancel={onCancel} closeIcon={null}>
      <UpdateCard goal={goal} onSubmit={onSubmit} />
    </Modal>
  );
};
