import { FieldError } from 'react-hook-form';

import cn from 'classnames';
import { ChangeEvent, forwardRef } from 'react';
import styles from './PhotoInput.module.scss';

export interface PhotoInputProps {
  id: string;
  name?: string;
  label?: string;
  error?: FieldError | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoInput = forwardRef<HTMLInputElement, PhotoInputProps>(
  ({ id, name, label, error, onChange }: PhotoInputProps, ref): JSX.Element => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

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
          onChange={handleFileChange}
          type="file"
          className={inputStyle}
        />

        {error && typeof error !== 'string' && (
          <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>
        )}

        {error && typeof error === 'string' && (
          <span className={styles.errorMessage}>{error && `${error}`}</span>
        )}
      </label>
    );
  }
);
