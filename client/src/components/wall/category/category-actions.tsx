import React, { FC } from 'react';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Popover } from 'antd';

// --- New category Display ---
const CategoryActionButton = styled(Button)`
  &:not(:last-child) {
    margin-right: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;

interface CategoryActionsProps {
  onEdit: () => any;
  onDelete: () => any;
}

export const CategoryActions: FC<CategoryActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <CategoryActionButton shape="circle" size="small" onClick={onEdit}>
        <EditOutlined />
      </CategoryActionButton>
      <CategoryActionButton shape="circle" size="small" onClick={onDelete}>
        <DeleteOutlined />
      </CategoryActionButton>
    </div>
  );
};

// --- Open new category ---
const CategoryMoreButton = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

interface OpenCategoryActionsButtonProps {
  onEdit: () => any;
  onDelete: () => any;
}

export const OpenCategoryActionsButton: FC<OpenCategoryActionsButtonProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <Popover
      trigger="hover"
      placement="right"
      content={<CategoryActions onEdit={onEdit} onDelete={onDelete} />}
    >
      <CategoryMoreButton>
        <MoreOutlined />
      </CategoryMoreButton>
    </Popover>
  );
};
