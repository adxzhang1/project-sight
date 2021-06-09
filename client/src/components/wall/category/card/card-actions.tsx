import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
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
  onEdit: () => void;
  onDelete: () => void;
}

export const GoalCardActions: FC<GoalCardActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <GoalCardActionsBase>
      <CardActionButton shape="circle" size="small" onClick={onEdit}>
        <EditOutlined />
      </CardActionButton>
      <CardActionButton shape="circle" size="small" onClick={onDelete}>
        <DeleteOutlined />
      </CardActionButton>
    </GoalCardActionsBase>
  );
};
