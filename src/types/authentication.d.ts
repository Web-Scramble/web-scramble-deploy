export type Inputs = {
  phone: string;
};
export type ValidateInputs = {
  otp: string;
  phone?: string;
};
export type UserCreationInputs = {
  username: string;
  email: string;
  phone?:string
};
export type User = {
  id: string;
  username: string;
  email: string;
  phone?:string;
  balance:string;
};

