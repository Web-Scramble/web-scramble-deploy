import axios from "axios";
import { Inputs, UserCreationInputs, ValidateInputs } from "@/types/authentication";

const baseURL = import.meta.env.VITE_API_URL


export const sendOtp = async (values:Inputs) => {
  const response = await axios.post(`${baseURL}auth/send-otp`,values);
  return response.data;
};
export const ValidateOtp = async (values:ValidateInputs) => {
  const response = await axios.post(`${baseURL}auth/validate-otp`,values);
  return response.data;
};
export const createUser = async (values:UserCreationInputs) => {
  console.log(values)
  const response = await axios.post(`${baseURL}auth/register`,values);
  return response.data;
};
export const socialAuth = async (values:any) => {
  console.log(values)
  const response = await axios.post(`${baseURL}auth/social`,values);
  return response.data;
};
export const updateServer = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await axios.patch(
    `${baseURL}server/update?id=${id}`,
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};
export const addServer = async (data: FormData) => {
  console.log(data);
  const response = await axios.post(
    "http://localhost:8000/product/create",
    data,
    // { headers: { "Content-Type": "application/json" } }
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};
export const deleteServer = async (id: string) => {
  const response = await axios.delete(
    `${baseURL}server/delete?id=${id}`
  );
  return response.data;
};
