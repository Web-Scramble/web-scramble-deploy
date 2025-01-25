import axios from "axios";
import { ChallengeFormData } from "@/types/challenge";
import { getToken } from "./getToken";

const baseURL = import.meta.env.VITE_API_URL;
const token = getToken();

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

export const createChallenge = async (data: ChallengeFormData) => {
    console.log({Authorization: `Bearer ${token}`})
  const response = await axios.post(`${baseURL}challenge`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const searchUser = async (username:string) => {
  const response = await axios.get(`${baseURL}user/username/${username}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};