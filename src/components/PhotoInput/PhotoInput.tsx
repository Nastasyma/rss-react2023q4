import { FieldError } from 'react-hook-form';

import cn from 'classnames';
import { ChangeEvent, forwardRef } from 'react';
import styles from './PhotoInput.module.scss';

export interface PhotoInputProps {
  id: string;
  name: string;
  placeholder?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  error?: FieldError;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PhotoInput = forwardRef<HTMLInputElement, PhotoInputProps>(
  (
    {
      id,
      name,
      placeholder,
      label,
      value,
      defaultValue,
      error,
      onChange,
      ...otherProps
    }: PhotoInputProps,
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
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          {...otherProps}
          type="file"
          placeholder={placeholder}
          className={inputStyle}
        />
        {error && (
          <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>
        )}
      </label>
    );
  }
);
