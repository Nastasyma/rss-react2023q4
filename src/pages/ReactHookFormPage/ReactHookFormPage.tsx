import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapper } from '../../components/FormWrapper/FormWrapper';
import { Input } from '../../components/Input/Input';
import styles from './ReactHookFormPage.module.scss';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { SelectInput } from '../../components/SelectInput/SelectInput';
import { CountriesInput } from '../../components/CountriesInput.tsx/CountriesInput';
import { PhotoInput } from '../../components/PhotoInput/PhotoInput';
import { AcceptInput } from '../../components/AcceptInput/AcceptInput';
import { formSchema } from '../../utils/formSchema';
import { ObjectSchema } from 'yup';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setFormData } from '../../store/form/formSlice';
import { useNavigate } from 'react-router-dom';
import { IData } from '../../utils/types';
import calculatePasswordStrength from '../../utils/passwordStrength';

interface ReactHookFormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: FileList;
  accept: boolean;
}

const initReactHookForm = {
  name: '',
  age: undefined,
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'Male',
  country: '',
  accept: false,
};
function ReactHookFormPage() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ReactHookFormFields>({
    resolver: yupResolver(formSchema as ObjectSchema<ReactHookFormFields>),
    mode: 'onChange',
    defaultValues: initReactHookForm,
  });

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ReactHookFormFields> = async (data) => {
    const pictureFile = data.picture[0];
    const pictureBase64 = await readFileAsDataURL(pictureFile);

    const formData: IData = {
      ...data,
      picture: pictureBase64,
      borderStyle: '4px solid #2f955d',
    };

    dispatch(setFormData(formData));

    navigate('/', { state: { from: 'react-hook-form' } });
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="on">
      <FormWrapper title="React Hook Form" buttonText="Submit" disableBtn={!isValid}>
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
                value={field.value || ''}
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
            const passwordStrength = calculatePasswordStrength(field.value);
            return (
              <>
                <PasswordInput
                  id="4"
                  placeholder="Password"
                  label="Password:"
                  {...field}
                  error={errors.password}
                />
                <div className={styles.passwordStrengthContainer}>
                  <span className={styles.passwordStrengthLabel}>Password Strength:</span>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      key={index}
                      className={styles.passwordStrength}
                      style={{ background: passwordStrength >= index + 1 ? 'green' : 'gray' }}
                    />
                  ))}
                </div>
              </>
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
            return (
              <PhotoInput
                id="7"
                label="Upload picture:"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.files);
                }}
                error={errors.picture}
              />
            );
          }}
        />
        <Controller
          name="country"
          control={control}
          rules={{ required: true }}
          render={({ field }): JSX.Element => {
            return (
              <CountriesInput
                id="8"
                label="Country:"
                placeholder="Select country..."
                {...field}
                error={errors.country}
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
      </FormWrapper>
    </form>
  );
}

export default ReactHookFormPage;
