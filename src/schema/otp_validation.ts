import * as yup from "yup";
const integerRegex = /^-?\d+$/;
export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(integerRegex, "Otp must be a number")
    .matches(/^\d{6,}$/, ' OTP must contain at least 6 digits')
    .required("Please enter the OTP number"),
});
