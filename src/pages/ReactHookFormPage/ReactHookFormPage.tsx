import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FormWrapper } from '../../components/FormWrapper/FormWrapper';
import { Input } from '../../components/Input/Input';
import styles from './ReactHookFormPage.module.scss';
import { countries } from '../../utils/countries';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { SelectInput } from '../../components/SelectInput/SelectInput';
import { CounriesInput } from '../../components/CountriesInput.tsx/CountriesInput';
import { PhotoInput } from '../../components/PhotoInput/PhotoInput';
import { AcceptInput } from '../../components/AcceptInput/AcceptInput';

interface ReactHookFormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  countries: string;
  picture: string;
  accept: boolean;
}

const initReactHookForm = {
  name: '',
  age: undefined,
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'Male',
  countries: '',
  accept: false,
};
function ReactHookFormPage() {
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
              <SelectInput
                id="6"
                label="Gender:"
                options={[
                  { value: 'Male', label: 'Male' },
                  { value: 'Female', label: 'Female' },
                ]}
                {...field}
                error={errors.gender}
              />
            );
          }}
        />
        <Controller
          name="picture"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return <PhotoInput id="7" label="Upload picture:" {...field} error={errors.picture} />;
          }}
        />
        <Controller
          name="countries"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <CounriesInput
                id="8"
                label="Countries:"
                placeholder="Select country..."
                countries={countries}
                {...field}
                error={errors.countries}
              />
            );
          }}
        />
        <Controller
          name="accept"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <AcceptInput
                id="9"
                label="Accept terms and conditions:"
                {...field}
                error={errors.accept}
              />
            );
          }}
        />
      </form>
    </FormWrapper>
  );
}

export default ReactHookFormPage;
