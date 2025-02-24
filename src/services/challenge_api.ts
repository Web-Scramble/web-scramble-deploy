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

export const createChallenge = async (data: ChallengeFormData) => {
  const response = await axios.post(`${baseURL}challengeType`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const submitChallengeSolution = async (data: SubmissionFormData) => {
  const response = await axios.post(`${baseURL}challenge/operation/${data.id}/submit`, data, {
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const mutateChallenge = async (data:ChallengeFormData) => {
  console.log(data,"services")
  const response = await axios.patch(`${baseURL}challengeType/${data.id}`,{data},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const createComment = async (data:any) => {
  console.log(data)
  const response = await axios.post(`${baseURL}challenge/operations/${data.id}/comments`,{message:data.body}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const deleteChallenge = async (id: string) => {

  const response = await axios.delete(`${baseURL}challengeType/${id}`, {
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
export const joinChallenge = async (id: string) => {
  console.log(`Bearer ${token} tokennnnnnasdasdasdasd`,id)
  const response = await axios.post(`${baseURL}challenge/operations/${id}/join`,{id},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const likeComment = async (data:{id:string,challengeId:string}) => {
  console.log(`Bearer ${token}`,data)
  // /challenge/operations/{challengeId}/comments/{commentId}/like
  const response = await axios.post(`${baseURL}challenge/operations/${data.challengeId}/comments/${data.id}/like`,{"asd":"asd"},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
