import { FieldError } from 'react-hook-form';

import cn from 'classnames';
import { ChangeEvent, forwardRef } from 'react';
import styles from './PhotoInput.module.scss';

export interface PhotoInputProps {
  id: string;
  name: string;
  label?: string;
  error?: FieldError;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoInput = forwardRef<HTMLInputElement, PhotoInputProps>(
  (
    { id, name, label, error, onChange, value, defaultValue, ...otherProps }: PhotoInputProps,
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
          onChange={onChange}
          defaultValue={defaultValue}
          value={value || ''}
          {...otherProps}
          type="file"
          className={inputStyle}
        />
        {error && (
          <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>
        )}
      </label>
    );
  }
);
