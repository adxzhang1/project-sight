import { Input } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, useAuthRedirect } from '../../hooks';
import { Spacer } from '../layout';
import { FlatButton } from '../wall/buttons';
import * as CONSTANTS from '../../constants';

export const Auth = () => {
  const { pathname } = useLocation();
  const { login, signup } = useAuth();
  useAuthRedirect();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSignup = pathname.endsWith('/signup');

  const submit = () => {
    if (isSignup) {
      return signup(email, password);
    }
    login(email, password);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '36rem',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <div>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <Spacer height="1rem" />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />

        <Spacer height="1rem" />
        <FlatButton
          color="white"
          backgroundColor={CONSTANTS.PRIMARY_COLOR}
          onClick={submit}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key.toLowerCase() == 'enter') {
              submit();
            }
          }}
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </FlatButton>
        <Spacer height=".5rem" />
        <div>
          <Link to={isSignup ? '/auth' : '/auth/signup'}>
            {isSignup ? 'Already have an account?' : 'Create an account'}
          </Link>
        </div>
      </div>
    </div>
  );
};
