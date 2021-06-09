import { Input, Modal } from 'antd';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { UpdateCategoryParams } from '../../../hooks';
import { Category } from '../../../types';
import { FlatButton } from '../buttons';
import { Spacer } from '../../layout';
import * as CONSTANTS from '../../../constants';

const UpdateCategoryInput = styled(Input)`
  max-width: 80%;
`;

interface UpdateCategoryProps {
  category: Category;
  onSubmit: (params: UpdateCategoryParams) => any;
}

export const UpdateCategory: FC<UpdateCategoryProps> = ({
  category,
  onSubmit,
}) => {
  const [data, setData] = useState({
    name: category.name,
  });

  const update = (key: string, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  return (
    <div>
      <UpdateCategoryInput
        value={data.name}
        onChange={(e) => update('name', e.target.value)}
      />
      <Spacer height="1rem" />
      <FlatButton
        color="white"
        backgroundColor={CONSTANTS.PRIMARY_COLOR}
        onClick={() => onSubmit(data)}
      >
        Save
      </FlatButton>
    </div>
  );
};

interface UpdateCategoryModalProps {
  category: Category;
  visible: boolean;
  onCancel: () => any;
  onSubmit: (params: UpdateCategoryParams) => any;
}

export const UpdateCategoryModal: FC<UpdateCategoryModalProps> = ({
  category,
  visible,
  onCancel,
  onSubmit,
}) => {
  return (
    <Modal visible={visible} footer={null} onCancel={onCancel}>
      <UpdateCategory category={category} onSubmit={onSubmit} />
    </Modal>
  );
};
