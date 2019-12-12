import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AuthProvider } from './contexts/AuthContext';
import App from './App';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.querySelector('#root')
);
