import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  age: yup.number().required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  countries: yup.string().required('Country is required'),
  accept: yup.boolean().oneOf([true], 'Acceptance is required'),
});
