import React, { useEffect } from 'react';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { profileRoute } from './Modules/Dashboard/pages';
import { useIsLoggedIn } from './hooks/useIsLoggedIn';
import { loginRoute } from './Modules/Auth/pages';

export const App: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  useEffect(() => {
    navigate((isLoggedIn ? profileRoute.path : loginRoute.path) ?? '/', {
      state: { from: location },
    });
  }, [isLoggedIn]);

  return <Outlet />;
};
