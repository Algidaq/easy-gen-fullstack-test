import React from 'react';
import styles from './Input.module.css';

export const InputLabel = React.forwardRef<
  HTMLLabelElement,
  Omit<React.HtmlHTMLAttributes<HTMLLabelElement>, 'className'>
>((props, ref) => {
  return (
    <div>
      <label ref={ref} className={styles.inputLabel} {...props} />
    </div>
  );
});
type InputProps = { fullWidth?: boolean } & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export const Input = React.forwardRef<HTMLInputElement | null, InputProps>(
  (props, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={[
            styles.input,
            props.className ?? '',
            props.fullWidth && 'fullWidth',
          ].join(' ')}
          {...props}
        />
      </div>
    );
  }
);

export const InputContainer: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = (props) => {
  return (
    <div className={[styles.inputContainer, props.className ?? ''].join(' ')}>
      {props.children}
    </div>
  );
};

export const InputErrorMessage: React.FC<{ message?: string }> = (props) => {
  if (!props.message) return <></>;
  return <p className={styles.inputError}>{props.message}</p>;
};
