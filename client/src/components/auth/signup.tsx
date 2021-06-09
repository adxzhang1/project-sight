import { Button, Input } from 'antd';
import React, { FC, useState } from 'react';

interface SignupProps {
  signup: (email: string, password: string) => any;
  switchAuth: () => void;
}

export const Signup: FC<SignupProps> = ({ signup, switchAuth }) => {
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
          signup(email, password);
        }}
      >
        Signup
      </Button>
      <Button onClick={switchAuth}>Login</Button>
    </div>
  );
};
