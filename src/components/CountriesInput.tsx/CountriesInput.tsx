import { FieldError } from 'react-hook-form';

import cn from 'classnames';
import { ChangeEvent, forwardRef } from 'react';
import styles from './CountriesInput.module.scss';
import { useSelector } from 'react-redux';
import { selectCountries } from '../../store/countries/countriesSelector';

export interface CounriesInputProps {
  id: string;
  name: string;
  placeholder?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  error?: FieldError;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CounriesInput = forwardRef<HTMLInputElement, CounriesInputProps>(
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
    }: CounriesInputProps,
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
        {error && (
          <span className={styles.errorMessage}>{error?.message && `${error.message}`}</span>
        )}
      </label>
    );
  }
);
