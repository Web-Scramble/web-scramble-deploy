import * as yup from "yup";

const phoneRegex = /^(\+)?([\d-\s()]){7,}$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const phoneSchema = yup.object().shape({
  phone: yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    // .matches(emailRegex, 'Invalid email')
    .required('Please enter a phone number'),
});
