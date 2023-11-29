import { FieldError } from 'react-hook-form';

import cn from 'classnames';
import { ChangeEvent, forwardRef } from 'react';
import styles from './AcceptInput.module.scss';

export interface AcceptInputProps {
  id: string;
  name: string;
  label?: string;
  defaultValue?: string;
  error?: FieldError;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AcceptInput = forwardRef<HTMLInputElement, AcceptInputProps>(
  (
    { id, name, label, defaultValue, error, onChange, ...otherProps }: AcceptInputProps,
    ref
  ): JSX.Element => {
    const inputStyle = cn(styles.input, {
      [styles.inputError]: error,
    });
    return (
      <label htmlFor={id} className={styles.label}>
        {label && <span>{label}</span>}
        <input
          id={id}
          name={name}
          ref={ref}
          defaultValue={defaultValue}
          onChange={onChange}
          {...otherProps}
          type="checkbox"
          className={inputStyle}
        />
        {error && (
          <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>
        )}
      </label>
    );
  }
);
