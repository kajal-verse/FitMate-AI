const { GoogleGenAI } = require("@google/genai");
const { chatAssistant } = require("../controllers/aiController");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateMealPlan = async (goal) => {
  const prompt = `
You are a professional fitness nutritionist.

Create a healthy one-day meal plan.

Goal: ${goal}

Include:
- Breakfast
- Lunch
- Dinner
- Snacks

Keep the response short and practical.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return {
      success: true,
      source: "Gemini AI",
      recommendation: response.text,
    };
  } catch (error) {
  console.error("Gemini Error:", error.message);

  return {
    success: true,
    source: "Fallback Recommendation",
    recommendation: `
🥣 Breakfast
• Oatmeal with banana

🍗 Lunch
• Grilled chicken with brown rice

🥜 Snack
• Apple and almonds

🍲 Dinner
• Vegetable soup with boiled eggs
`,
  };
}
};


const generateWorkoutPlan = async (goal, experience) => {
  const prompt = `
You are a certified fitness trainer.

Create a 7-day workout plan.

Goal: ${goal}
Experience: ${experience}

Include:
- Day 1
- Day 2
- Day 3
- Day 4
- Day 5
- Day 6
- Day 7

Keep it simple and practical.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return {
      success: true,
      source: "Gemini AI",
      recommendation: response.text,
    };
  } catch (error) {
    console.error("Gemini Error:", error.message);

    return {
      success: true,
      source: "Fallback Recommendation",
      recommendation: `
🏋️ Day 1: Chest & Triceps

🏋️ Day 2: Back & Biceps

🏋️ Day 3: Legs

🏋️ Day 4: Rest

🏋️ Day 5: Shoulders

🏋️ Day 6: Full Body

🏋️ Day 7: Cardio & Stretching
`,
    };
  }
};

const chatWithAI = async (message) => {
  const prompt = `
You are FitMate AI, a friendly and knowledgeable fitness assistant.

Answer the following user's fitness question in a simple, clear, and motivating way.

Question:
${message}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return {
      success: true,
      source: "Gemini AI",
      reply: response.text,
    };
  } catch (error) {
    console.error("Gemini Error:", error.message);

    return {
      success: true,
      source: "Fallback Recommendation",
      reply:
        "Regular exercise, a balanced diet, proper hydration, and 7–8 hours of sleep are the foundation of good fitness. Stay consistent and consult a healthcare professional for personalized medical advice.",
    };
  }
};

module.exports ={
    generateMealPlan,
    generateWorkoutPlan,
    chatWithAI,
};