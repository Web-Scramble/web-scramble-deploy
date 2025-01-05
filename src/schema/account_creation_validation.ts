import * as Yup from 'yup';

export const userSchema = Yup.object({
  // username: Yup.string()
  //   .min(3, 'Username must be at least 3 characters long')
  //   .max(20, 'Username cannot be more than 20 characters')
  //   .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
  //   .required('Username is required'),
  username: Yup.string()
  .min(3, 'Username must be at least 3 characters long')
  .max(20, 'Username cannot be more than 20 characters')
  .matches(/^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)?$/, 'Username can only contain letters, numbers, underscores, and a single space')
  .required('Username is required'),
    email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});