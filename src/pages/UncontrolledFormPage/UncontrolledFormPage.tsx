import styles from './UncontrolledFormPage.module.scss';

import { FormWrapper } from '../../components/FormWrapper/FormWrapper';
import { Input } from '../../components/Input/Input';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { SelectInput } from '../../components/SelectInput/SelectInput';
import { CounriesInput } from '../../components/CountriesInput.tsx/CountriesInput';
import { PhotoInput } from '../../components/PhotoInput/PhotoInput';
import { AcceptInput } from '../../components/AcceptInput/AcceptInput';
import { formSchema } from '../../utils/formSchema';
import { ValidationError } from 'yup';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setFormData } from '../../store/form/formSlice';
import calculatePasswordStrength from '../../utils/passwordStrength';

function UncontrolledFormPage() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const age = ageRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    const gender = genderRef.current?.value;
    const country = countryRef.current?.value;
    const accept = acceptRef.current?.checked;
    const picture = pictureRef.current?.files;

    const passwordStrength = calculatePasswordStrength(password || '');
    setPasswordStrength(passwordStrength);

    try {
      const formData = {
        name,
        age,
        email,
        password,
        confirmPassword,
        gender,
        country,
        accept,
        picture,
      };

      formSchema.validateSync(formData, { abortEarly: false });

      if (!picture || picture.length === 0) {
        return;
      }
      const pictureBase64 = await readFileAsDataURL(picture[0]);

      dispatch(
        setFormData({
          name: name || '',
          age: Number(age),
          email: email || '',
          password: password || '',
          confirmPassword: confirmPassword || '',
          gender: gender || '',
          country: country || '',
          accept: accept || false,
          picture: pictureBase64,
          borderStyle: '4px solid #2f955d',
        })
      );

      navigate('/', { state: { from: 'uncontrolled-form' } });
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (!e.path) return;
          errors[e.path] = e.message;
        });

        setValidationErrors(errors);
      }
    }
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
    <form onSubmit={onSubmit} className={styles.form} ref={formRef} autoComplete="on">
      <FormWrapper title="Uncontrolled Form" buttonText="Submit" disableBtn={false}>
        <Input
          id="1"
          type="text"
          placeholder="Name"
          label="Name:"
          ref={nameRef}
          error={validationErrors.name}
        />
        <Input
          id="2"
          type="number"
          placeholder="Age"
          label="Age:"
          ref={ageRef}
          error={validationErrors.age}
        />
        <Input
          id="3"
          type="text"
          placeholder="Email"
          label="Email:"
          ref={emailRef}
          error={validationErrors.email}
        />
        <>
          <PasswordInput
            id="4"
            placeholder="Password"
            label="Password:"
            ref={passwordRef}
            error={validationErrors.password}
          />
          {Object.keys(validationErrors).length > 0 && (
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
          )}
        </>
        <PasswordInput
          id="5"
          placeholder="Confirm Password"
          label="Confirm Password:"
          ref={confirmPasswordRef}
          error={validationErrors.confirmPassword}
        />
        <SelectInput
          id="6"
          label="Gender:"
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
          ]}
          ref={genderRef}
          error={validationErrors.gender}
        />
        <PhotoInput
          id="7"
          label="Upload picture:"
          ref={pictureRef}
          error={validationErrors.picture}
        />
        <CounriesInput
          id="8"
          label="Country:"
          placeholder="Select country..."
          ref={countryRef}
          error={validationErrors.country}
        />
        <AcceptInput
          id="9"
          label="Accept terms and conditions:"
          ref={acceptRef}
          error={validationErrors.accept}
        />
      </FormWrapper>
    </form>
  );
}

export default UncontrolledFormPage;
