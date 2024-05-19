import React from 'react';
import styles from './DashboardLayoutPage.module.css';
import { Outlet } from 'react-router-dom';

export const DashboardLayoutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sideNav} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
