import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import { App } from './App';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import AuthModule from './Modules/Auth';
import DashboardModule from './Modules/Dashboard';

const ErrorPage: React.FC = () => {
  return (
    <div className="error-page">
      <p>🙅🏽‍♂️</p>
      <Link to="/">Back</Link>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorPage />,

    children: [...AuthModule.routes, ...DashboardModule.routes],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
