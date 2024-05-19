import React from 'react';
import styles from './DashboardLayoutPage.module.css';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useIsLoggedIn } from '../../../../hooks/useIsLoggedIn';

export const DashboardLayoutPage: React.FC = () => {
  const location = useLocation();
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sideNav} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
