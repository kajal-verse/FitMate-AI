require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log("Key loaded:", process.env.GEMINI_API_KEY?.substring(0, 10));

async function listModels() {
  try {
    const models = await ai.models.list();

    for await (const model of models) {
      console.log(model.name);
    }
  } catch (err) {
    console.error(err);
  }
}

listModels();