import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../hooks';

export const Navbar = () => {
  const history = useHistory();
  const { token, logout } = useAuth();

  return (
    <div style={{ display: 'flex' }}>
      <p onClick={() => history.push('/')}>Main</p>
      <p onClick={() => history.push('/auth')}>Auth</p>
      {token && <p onClick={logout}>Logout</p>}
    </div>
  );
};
