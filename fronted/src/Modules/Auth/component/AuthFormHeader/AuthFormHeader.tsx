import React from 'react';
import styles from './AuthFormHeader.module.css';
import { Link } from 'react-router-dom';
type Props = {
  title: string;
  subtitle: string;
  link: { to: string; text: string };
};
export const AuthFormHeader: React.FC<Props> = (props) => {
  return (
    <div className={styles.headerContainer}>
      <h3 className={styles.header}>{props.title}</h3>
      <div className={styles.headerSubContainer}>
        <p className={styles.headerSubtitle}>
          {`${props.subtitle} `}
          <Link to={props.link.to} className={styles.link}>
            {props.link.text}
          </Link>
        </p>
      </div>
    </div>
  );
};
