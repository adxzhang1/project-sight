import React, { FC, useState } from 'react';
import { Goal } from '../../types';
import styled from 'styled-components';
import { Button, Modal, Popover } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const CardActionButton = styled(Button)`
  &:not(:last-child) {
    margin-right: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const GoalCardActionsBase = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

interface GoalCardActionsProps {
  onDelete: () => void;
}

const GoalCardActions: FC<GoalCardActionsProps> = ({ onDelete }) => {
  return (
    <GoalCardActionsBase>
      <CardActionButton shape="circle" size="small" onClick={() => {}}>
        <EditOutlined />
      </CardActionButton>
      <CardActionButton shape="circle" size="small" onClick={onDelete}>
        <DeleteOutlined />
      </CardActionButton>
    </GoalCardActionsBase>
  );
};

export const GoalCardBase = styled.div`
  * {
    margin: 0;
  }

  padding: 0.4rem 01.2rem;
  margin-right: 0.8rem;
  margin-bottom: 0.8rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

interface GoalCardProps {
  goal: Goal;
  onDelete: () => void;
}

export const GoalCard: FC<GoalCardProps> = ({ goal, onDelete }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <React.Fragment>
      <Popover
        content={<GoalCardActions onDelete={onDelete} />}
        placement="right"
      >
        <GoalCardBase onClick={() => setIsDetailsOpen(true)}>
          <p>{goal.title}</p>
        </GoalCardBase>
      </Popover>
      <Modal
        visible={isDetailsOpen}
        footer={null}
        onCancel={() => setIsDetailsOpen(false)}
      >
        <p>{goal.title}</p>
        {goal.description && <p>{goal.description}</p>}
      </Modal>
    </React.Fragment>
  );
};
