import axios from "axios";
import {
  Inputs,
  UserCreationInputs,
  ValidateInputs,
} from "@/types/authentication";
import { ChallengeFormData } from "@/types/challenge";
import { getToken } from "./getToken";

const baseURL = import.meta.env.VITE_API_URL;
const token = getToken();

export const updateUserProfile = async (user: Inputs) => {
    console.log(user)
  const response = await axios.patch(`${baseURL}user/${user.id}`, user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getUserById = async (userId:string) => {
  const response = await axios.get(`${baseURL}user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const followUser = async (userId:string) => {
  const response = await axios.post(`${baseURL}user/follow/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const unFollowUser = async (userId:string) => {
  const response = await axios.post(`${baseURL}user/unfollow/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const ValidateOtp = async (values: ValidateInputs) => {
  const response = await axios.post(`${baseURL}auth/validate-otp`, values);
  return response.data;
};
export const createUser = async (values: UserCreationInputs) => {
  console.log(values);
  const response = await axios.post(`${baseURL}auth/register`, values);
  return response.data;
};
export const socialAuth = async (values: any) => {
  console.log(values);
  const response = await axios.post(`${baseURL}auth/social`, values);
  return response.data;
};

export const updateServer = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await axios.patch(`${baseURL}server/update?id=${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
  const response = await axios.delete(`${baseURL}server/delete?id=${id}`);
  return response.data;
};
