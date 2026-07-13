const aiService = require("../services/aiService");

const mealRecommendation = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({
        success: false,
        message: "Goal is required.",
      });
    }

    const result = await aiService.generateMealPlan(goal);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const workoutRecommendation = async (req, res) => {
  try {
    const { goal, experience } = req.body;

    if (!goal || !experience) {
      return res.status(400).json({
        success: false,
        message: "Goal and experience are required.",
      });
    }

    const result = await aiService.generateWorkoutPlan(
      goal,
      experience
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const chatAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const result = await aiService.chatWithAI(message);

    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  mealRecommendation,
  workoutRecommendation,
  chatAssistant,
};