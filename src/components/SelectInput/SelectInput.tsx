import { FieldError } from 'react-hook-form';

import cn from 'classnames';
import { ChangeEvent, forwardRef } from 'react';
import styles from './SelectInput.module.scss';

interface Option {
  value: string;
  label: string;
}

export interface SelectInputProps {
  id: string;
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  options: Option[];
  defaultValue?: string;
  error?: FieldError | string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      id,
      name,
      placeholder,
      label,
      value,
      options,
      defaultValue,
      error,
      onChange,
      ...otherProps
    }: SelectInputProps,
    ref
  ): JSX.Element => {
    const inputStyle = cn(styles.input, {
      [styles.inputError]: error,
    });
    return (
      <label htmlFor={id} className={styles.label}>
        {label && <span>{label}</span>}
        <select
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          className={inputStyle}
          defaultValue={defaultValue}
          ref={ref}
          {...otherProps}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

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
