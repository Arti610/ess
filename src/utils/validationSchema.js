import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and be at least 8 characters long',
    ),
});
