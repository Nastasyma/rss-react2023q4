import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormWrapper } from '../../components/FormWrapper/FormWrapper';
import { Input } from '../../components/Input/Input';
import styles from './ReactHookFormPage.module.scss';
import { countries } from '../../utils/countries';
import { useState } from 'react';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';

interface ReactHookFormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  countries: string;
}

const initReactHookForm = {
  name: '',
  age: undefined,
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'Male',
  countries: '',
};
function ReactHookFormPage() {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReactHookFormFields>({
    // resolver: yupResolver(signInSchema as ObjectSchema<ReactHookFormFields>),
    mode: 'onChange',
    defaultValues: initReactHookForm,
  });

  const onSubmit: SubmitHandler<ReactHookFormFields> = (data) => {
    setErrorMessage('');
    console.log(data);
  };

  return (
    <FormWrapper title="React Hook Form" buttonText="Submit" disableBtn={false}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <Input
                id="1"
                type="text"
                placeholder="Name"
                label="Name:"
                {...field}
                error={errors.name}
              />
            );
          }}
        />
        <Controller
          name="age"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <Input
                id="2"
                type="number"
                placeholder="Age"
                label="Age:"
                {...field}
                error={errors.age}
              />
            );
          }}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <Input
                id="3"
                type="text"
                placeholder="Email"
                label="Email:"
                {...field}
                error={errors.email}
              />
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <PasswordInput
                id="4"
                placeholder="Password"
                label="Password:"
                {...field}
                error={errors.password}
              />
            );
          }}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <PasswordInput
                id="5"
                placeholder="Confirm Password"
                label="Confirm Password:"
                {...field}
                error={errors.confirmPassword}
              />
            );
          }}
        />
        <Controller
          name="gender"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <>
                <label htmlFor="6" className={styles.label}>
                  Gender:
                  <select id="6" placeholder="Gender" {...field} className={styles.input}>
                    <option value="" disabled selected>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </label>
              </>
            );
          }}
        />
        <Controller
          name="countries"
          control={control}
          rules={{ required: true }}
          render={(): JSX.Element => {
            return (
              <>
                <label htmlFor="7" className={styles.label}>
                  Countries:
                  <input
                    id="7"
                    type="text"
                    placeholder="Country"
                    list="countries"
                    className={styles.input}
                  />
                  <datalist id="countries">
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </datalist>
                </label>
              </>
            );
          }}
        />
        <Controller
          name="countries"
          control={control}
          rules={{ required: true }}
          render={(): JSX.Element => {
            return (
              <>
                <label htmlFor="8" className={styles.accept}>
                  Accept T&C:
                  <input id="8" type="checkbox" className={styles.input} />
                  {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
                </label>
              </>
            );
          }}
        />
      </form>
    </FormWrapper>
  );
}

export default ReactHookFormPage;
