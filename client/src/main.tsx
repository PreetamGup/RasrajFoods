import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import UserData from './context/user.context.js';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserData>
      <App />
    </UserData>
  </StrictMode>
);
