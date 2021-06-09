import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks';
import { Spacer } from '../layout';
import { FlatButton } from '../wall/buttons';

const NavbarBase = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  background-color: rgba(254, 254, 254, 0.9);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const NavbarItem = styled(Link)`
  font-weight: bold;
`;

export const Navbar = () => {
  const { token, logout } = useAuth();
  const history = useHistory();

  return (
    <NavbarBase>
      <NavbarItem to="/">Home</NavbarItem>
      <Spacer width="auto" />
      <FlatButton
        onClick={() => {
          if (token) {
            return logout();
          }
          history.push('/auth');
        }}
      >
        {token ? 'Logout' : 'Login'}
      </FlatButton>
    </NavbarBase>
  );
};
