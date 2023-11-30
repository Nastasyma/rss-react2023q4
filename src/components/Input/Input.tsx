import { FieldError } from 'react-hook-form';
import { ChangeEvent, forwardRef } from 'react';

import cn from 'classnames';

import styles from './Input.module.scss';

export interface IInputProps {
  id: string;
  placeholder: string;
  label?: string;
  defaultValue?: string;
  error?: FieldError;
  value?: string | number;
  type?: 'text' | 'email' | 'number';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      id,
      placeholder,
      label,
      defaultValue,
      error,
      type = 'number',
      value,
      onChange,
      ...otherProps
    }: IInputProps,
    ref
  ) => {
    const inputStyle = cn(styles.input, {
      [styles.inputError]: error,
    });
    return (
      <label htmlFor={id} className={styles.label}>
        {label && <span>{label}</span>}
        {onChange ? (
          <input
            ref={ref}
            id={id}
            placeholder={placeholder}
            className={inputStyle}
            defaultValue={defaultValue}
            type={type}
            value={value}
            {...otherProps}
            onChange={onChange}
          />
        ) : (
          <input
            ref={ref}
            id={id}
            placeholder={placeholder}
            className={inputStyle}
            defaultValue={defaultValue}
            type={type}
            value={value}
            {...otherProps}
          />
        )}

        {error && (
          <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>
        )}
      </label>
    );
  }
);
