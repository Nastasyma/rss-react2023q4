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
    .typeError('Age must be a number')
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
      const regex = /[A-ZА-ЯЁ]/;
      return regex.test(value);
    })
    .test('containsLowercase', 'Password must contain at least 1 lowercase letter', (value) => {
      if (!value) return true;
      const regex = /[a-zа-яё]/;
      return regex.test(value);
    })
    .test(
      'containsSpecialCharacter',
      'Password must contain at least 1 special character',
      (value) => {
        if (!value) return true;
        const regex = /[^A-ZА-Яa-zа-я0-9Ёё\s]/;
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
      const regex = /[A-ZА-ЯЁ]/;
      return regex.test(value);
    })
    .test('containsLowercase', 'Password must contain at least 1 lowercase letter', (value) => {
      if (!value) return true;
      const regex = /[a-zа-яё]/;
      return regex.test(value);
    })
    .test(
      'containsSpecialCharacter',
      'Password must contain at least 1 special character',
      (value) => {
        if (!value) return true;
        const regex = /[^A-ZА-Яa-zа-я0-9Ёё\s]/;
        return regex.test(value);
      }
    )
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  picture: yup
    .mixed<FileList>()
    .required('Picture is required')
    .test('fileType', 'Invalid file format. Supported formats: JPEG, PNG', (value) => {
      if (!value.length) return false;
      return value && ['image/jpeg', 'image/png'].includes(value[0].type);
    })
    .test('fileSize', 'File size must be no larger than 1MB', (value) => {
      if (!value.length) return false;
      return value && value[0].size <= 1000000;
    }),
  country: yup.string().required('Country is required'),
  accept: yup.boolean().oneOf([true], 'Acceptance is required'),
});
