import api from "./api";

// Get all meals
export const getMeals = async () => {
  const response = await api.get("/meals");
  return response.data;
};

// Add meal
export const createMeal = async (mealData) => {
  const response = await api.post("/meals", mealData);
  return response.data;
};

// Update meal
export const updateMeal = async (id, mealData) => {
  const response = await api.put(`/meals/${id}`, mealData);
  return response.data;
};

// Delete meal
export const deleteMeal = async (id) => {
  const response = await api.delete(`/meals/${id}`);
  return response.data;
};

export const analyzeNutrition = async(foodName)=>{

const response = await api.post("/ai/nutrition",{
foodName
});

return response.data;
};

