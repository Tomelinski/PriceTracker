import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
  firstName: yup.string().min(2).required('First Name is required'),
  lastName: yup.string().min(2).required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default RegisterSchema;
