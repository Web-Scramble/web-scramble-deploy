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
  const response = await axios.post(`${baseURL}challenge/taskType`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getChallenges = async () => {
  const response = await axios.get(`${baseURL}challenge/fetch/all`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getChallenge = async (id: string) => {
  const response = await axios.get(`${baseURL}challenge/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const mutateChallenge = async (id: string) => {
  const response = await axios.patch(`${baseURL}challenge/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const deleteChallenge = async (id: string) => {
  const response = await axios.delete(`${baseURL}challenge/taskType/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const increaseChallengeReward = async (id: string, data: string) => {
  const response = await axios.post(`${baseURL}challenge/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const joinChallenge = async (id: string, data: string) => {
  const response = await axios.post(`${baseURL}challenge/${id}/join`, data, {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
