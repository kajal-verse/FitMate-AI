const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  mealRecommendation,
  workoutRecommendation,
  chatAssistant,
  analyzeNutrition,
  getFitnessAnalysis,
} = require("../controllers/aiController");

router.post("/meal", protect, mealRecommendation);
router.post("/workout", protect, workoutRecommendation);
router.post("/chat", protect, chatAssistant);
router.post("/nutrition", protect, analyzeNutrition);
router.post("/fitness-analysis", protect, getFitnessAnalysis);

module.exports = router;