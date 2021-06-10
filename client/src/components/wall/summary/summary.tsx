import React, { FC, useMemo, useState } from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';
import { FlatButton } from '../buttons';
import { ContainerOutlined } from '@ant-design/icons';
import { Category } from '../../../types';
import { Spacer } from '../../layout';
import { SummaryItem } from './summary-item';

const SummaryButton = styled(FlatButton)`
  position: fixed;
  right: 0;
  top: 5rem;
  transform: translateY(-50%);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 0.8rem;
`;

interface SummaryProps {
  categories: Category[];
}

export const Summary: FC<SummaryProps> = ({ categories }) => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <SummaryButton
        backgroundColor="rgba(255, 255, 255, .95)"
        onClick={() => setVisible(true)}
      >
        <ContainerOutlined />
      </SummaryButton>
      <Drawer
        width="20rem"
        visible={visible}
        placement="right"
        onClose={() => setVisible(false)}
      >
        <Spacer height="2rem" />
        {categories.map((category) => (
          <SummaryItem key={category._id} category={category} />
        ))}
      </Drawer>
    </React.Fragment>
  );
};
