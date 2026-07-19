const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ================= Meal Recommendation =================

const generateMealPlan = async (goal) => {
  const prompt = `
You are a professional nutritionist.

Create a healthy one-day meal plan.

Goal: ${goal}

Include:
Breakfast
Lunch
Dinner
Snack

Keep it short.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return {
    success: true,
    recommendation: response.text,
  };
};

// ================= Workout Recommendation =================

const generateWorkoutPlan = async (goal, experience) => {
  const prompt = `
You are a fitness trainer.

Create a 7-day workout plan.

Goal: ${goal}
Experience: ${experience}

Keep it practical.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return {
    success: true,
    recommendation: response.text,
  };
};

// ================= AI Chat =================

const chatWithAI = async (message) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
    });

    return {
      success: true,
      reply: response.text,
    };

  } catch (error) {

    console.log("Chat Error:", error);

    return {
      success: true,
      reply:
        "I'm currently experiencing high demand. Please try again in a few moments. Meanwhile, remember to stay hydrated, eat balanced meals, and exercise regularly! 💪",
    };

  }
};

// ================= Nutrition Analyzer =================

const getNutrition = async (foodName) => {
  const prompt = `
Estimate nutrition for:

${foodName}

Return ONLY valid JSON.

{
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number
}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    let text = response.text.trim();

    text = text.replace(/```json/g, "")
               .replace(/```/g, "")
               .trim();

    return {
      success: true,
      nutrition: JSON.parse(text),
    };

  } catch (error) {

    console.log("Gemini unavailable. Using fallback.");

    // Simple estimated nutrition values
    const nutritionDatabase = {
      "banana": { calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
      "apple": { calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
      "egg": { calories: 78, protein: 6, carbs: 0.6, fat: 5 },
      "rice": { calories: 205, protein: 4.3, carbs: 45, fat: 0.4 },
      "chicken breast": { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      "chicken biryani": { calories: 420, protein: 24, carbs: 46, fat: 14 },
      "milk": { calories: 103, protein: 8, carbs: 12, fat: 2.4 },
      "oatmeal": { calories: 150, protein: 5, carbs: 27, fat: 3 },
    };

    const key = foodName.toLowerCase();

    return {
      success: true,
      nutrition:
        nutritionDatabase[key] || {
          calories: 250,
          protein: 10,
          carbs: 30,
          fat: 8,
        },
    };
  }
};

const getFitnessAnalysis = async (user) => {
  const prompt = `
You are an expert AI Fitness Coach.

Analyze the following user:

Name: ${user.name}
Age: ${user.age}
Gender: ${user.gender}
Height: ${user.height} cm
Weight: ${user.weight} kg
Fitness Goal: ${user.fitnessGoal}
Activity Level: ${user.activityLevel}

Calculate BMI.

Return ONLY valid JSON.

{
  "bmi": number,
  "bmiStatus": "",
  "dailyCalories": "",
  "protein": "",
  "water": "",
  "workout": [
    "",
    ""
  ],
  "nutrition": [
    "",
    ""
  ],
  "motivation": ""
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  let text = response.text.trim();

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return {
    success: true,
    analysis: JSON.parse(text),
  };
};

module.exports = {
  generateMealPlan,
  generateWorkoutPlan,
  chatWithAI,
  getNutrition,
  getFitnessAnalysis,
};