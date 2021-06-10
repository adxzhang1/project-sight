import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

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
  isComplete: boolean;
  onCheck: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const GoalCardActions: FC<GoalCardActionsProps> = ({
  isComplete,
  onCheck,
  onEdit,
  onDelete,
}) => {
  return (
    <GoalCardActionsBase>
      <CardActionButton shape="circle" size="small" onClick={onCheck}>
        {isComplete ? <CloseOutlined /> : <CheckOutlined />}
      </CardActionButton>
      <CardActionButton shape="circle" size="small" onClick={onEdit}>
        <EditOutlined />
      </CardActionButton>
      <CardActionButton shape="circle" size="small" onClick={onDelete}>
        <DeleteOutlined />
      </CardActionButton>
    </GoalCardActionsBase>
  );
};
