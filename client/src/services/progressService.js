import api from "./api";

// Get all progress records
export const getProgress = async () => {
  const response = await api.get("/progress");
  return response.data;
};

// Create progress
export const createProgress = async (progressData) => {
  const response = await api.post("/progress", progressData);
  return response.data;
};

// Update progress
export const updateProgress = async (id, progressData) => {
  const response = await api.put(`/progress/${id}`, progressData);
  return response.data;
};

// Delete progress
export const deleteProgress = async (id) => {
  const response = await api.delete(`/progress/${id}`);
  return response.data;
};