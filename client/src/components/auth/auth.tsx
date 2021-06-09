import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useAuth, useAuthRedirect } from '../../hooks';
import { Login } from './login';
import { Signup } from './signup';

export const Auth = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const { login, signup } = useAuth();
  useAuthRedirect();

  const switchAuth = (to: string) => {
    history.push(match.path + to);
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
      <Switch>
        <Route
          path={`${match.path}/signup`}
          render={() => (
            <Signup signup={signup} switchAuth={() => switchAuth('/')} />
          )}
        />
        <Route
          render={() => (
            <Login login={login} switchAuth={() => switchAuth('/signup')} />
          )}
        />
      </Switch>
    </div>
  );
};
