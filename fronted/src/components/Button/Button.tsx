import React from 'react';
import styles from './Button.module.css';

type FormButtonProps = {
  busy?: boolean;
  text: string;
  Icon?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export const Button = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        className={styles.formButton}
        {...props}
        disabled={props.busy || props.disabled}
      >
        {props.busy ? (
          'Loading ...'
        ) : (
          <>
            {props.Icon}
            <p>{props.text}</p>
          </>
        )}
      </button>
    );
  }
);
