import React, { useEffect } from 'react';

import styles from './App.module.css';
import LoginImage from './assets/login-image.png';
import { Outlet, useNavigate } from 'react-router-dom';

export const App: React.FC = () => {
  const isLoggedIn = localStorage.getItem('authorization') !== null;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard/profile');
    } else {
      navigate('/auth/login');
    }
  }, []);

  return <Outlet />;
};

export const AuthLayoutPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Outlet />
      </div>
      <div className={styles.imageContainer}>
        <img src={LoginImage} className={styles.loginImage} />
      </div>
    </div>
  );
};
