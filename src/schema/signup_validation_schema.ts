import * as yup from "yup";

// const phoneRegex = /^(\+)?([\d-\s()]){7,}$/; this is the regex
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+)?[\d\s()-]{7,}$/;

export const phoneSchema = yup.object().shape({
  phone: yup.string()
    .matches(phoneRegex, 'Invalid phone number')
    .required('Please enter a phone number'),
});
