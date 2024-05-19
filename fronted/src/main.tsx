import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthModule from './Modules/Auth';
import DashboardModule from './Modules/Dashboard';
const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [...AuthModule.routes, ...DashboardModule.routes],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
