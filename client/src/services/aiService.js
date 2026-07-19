import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const sendMessage = async (message) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const response = await axios.post(
    `${API}/chat`,
    { message },
    {
      withCredentials : true,
    }
  );

  return response.data;
};

import api from "./api";

export const getFitnessAnalysis = async () => {
  const response = await api.post("/ai/fitness-analysis");
  return response.data;
};