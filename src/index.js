import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProviderMenu } from './provider/authProviderMenu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProviderMenu>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProviderMenu>
);

