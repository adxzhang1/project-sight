import React from 'react';
import './index.css';
import 'antd/dist/antd.css';
import { Switch, Route } from 'react-router-dom';
import { Wall } from './components/wall';
import { Auth } from './components/auth';
import { Navbar } from './components/navbar';
import { Container, Spacer } from './components/layout';

export const App = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Spacer height="5rem" />
      <Container>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Wall} />
          <Route render={() => <h1>hi</h1>} />
        </Switch>
      </Container>
    </React.Fragment>
  );
};
