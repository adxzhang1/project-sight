import React from 'react';
import { render } from 'react-dom';
import { App } from './app';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks';

render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
