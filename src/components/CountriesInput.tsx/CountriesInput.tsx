import { FieldError } from 'react-hook-form';

import cn from 'classnames';
import { ChangeEvent, forwardRef } from 'react';
import styles from './CountriesInput.module.scss';
import { useSelector } from 'react-redux';
import { selectCountries } from '../../store/countries/countriesSelector';

export interface CountriesInputProps {
  id: string;
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  error?: FieldError | string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CountriesInput = forwardRef<HTMLInputElement, CountriesInputProps>(
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
    }: CountriesInputProps,
    ref
  ): JSX.Element => {
    const inputStyle = cn(styles.input, {
      [styles.inputError]: error,
    });

    const countries = useSelector(selectCountries);

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
          type="text"
          placeholder={placeholder}
          list="countries"
          className={inputStyle}
        />
        <datalist id="countries">
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </datalist>

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
