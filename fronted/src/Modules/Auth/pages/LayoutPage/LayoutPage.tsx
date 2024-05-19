import styles from './LayoutPage.module.css';
import LoginImage from '../../../../assets/login-image.png';
import { Outlet } from 'react-router-dom';

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
