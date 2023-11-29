import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .test('hasUppercase', 'First letter must be uppercase', (value) => {
      if (!value) return true;
      const firstLetter = value.charAt(0);
      return firstLetter === firstLetter.toUpperCase();
    }),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .test('isNumber', 'Age must be a number', (value) => !isNaN(value)),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .test('containsNumber', 'Password must contain at least 1 number', (value) => {
      if (!value) return true;
      const regex = /\d/;
      return regex.test(value);
    })
    .test('containsUppercase', 'Password must contain at least 1 uppercase letter', (value) => {
      if (!value) return true;
      const regex = /[A-Z]/;
      return regex.test(value);
    })
    .test('containsLowercase', 'Password must contain at least 1 lowercase letter', (value) => {
      if (!value) return true;
      const regex = /[a-z]/;
      return regex.test(value);
    })
    .test(
      'containsSpecialCharacter',
      'Password must contain at least 1 special character',
      (value) => {
        if (!value) return true;
        const regex = /\W/;
        return regex.test(value);
      }
    ),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .test('containsNumber', 'Password must contain at least 1 number', (value) => {
      if (!value) return true;
      const regex = /\d/;
      return regex.test(value);
    })
    .test('containsUppercase', 'Password must contain at least 1 uppercase letter', (value) => {
      if (!value) return true;
      const regex = /[A-Z]/;
      return regex.test(value);
    })
    .test('containsLowercase', 'Password must contain at least 1 lowercase letter', (value) => {
      if (!value) return true;
      const regex = /[a-z]/;
      return regex.test(value);
    })
    .test(
      'containsSpecialCharacter',
      'Password must contain at least 1 special character',
      (value) => {
        if (!value) return true;
        const regex = /\W/;
        return regex.test(value);
      }
    )
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  picture: yup
    .mixed<FileList>()
    .required('Picture is required')
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true;
      return value && value[0].size <= 2_000_000;
    })
    .test('fileType', 'Invalid file format', (value) => {
      if (!value) return true;
      return value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value[0].type);
    }),
  countries: yup.string().required('Country is required'),
  accept: yup.boolean().oneOf([true], 'Acceptance is required'),
});
