import { Button, Input } from 'antd';
import React, { FC, useState } from 'react';

interface LoginProps {
  login: (email: string, password: string) => any;
  switchAuth: () => void;
}

export const Login: FC<LoginProps> = ({ login, switchAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <Button
        onClick={() => {
          login(email, password);
        }}
      >
        Login
      </Button>
      <Button onClick={switchAuth}>Signup</Button>
    </div>
  );
};
