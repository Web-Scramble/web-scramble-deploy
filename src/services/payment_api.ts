import axios from "axios";
import { ChallengeFormData } from "@/types/challenge";
import { getToken } from "./getToken";
import { SubmissionFormData } from "@/schema/submission_validation_schema";

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

// export const getTransactionHistory = async (id: string) => {
export const getTransactionHistory = async () => {
    // console.log({Authorization: `Bearer ${token}`},id)
  const response = await axios.get(`${baseURL}payment/history`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const submitChallengeSolution = async (data: SubmissionFormData) => {
    console.log({Authorization: `Bearer ${token}`})
  const response = await axios.post(`${baseURL}challenge/operation/${data.id}/submit`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};