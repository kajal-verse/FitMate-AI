const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createMeal,getMyMeals,getMealById,updateMeal,deleteMeal } = require("../controllers/mealController");

router.post("/", protect, createMeal);
router.get("/", protect, getMyMeals);
router.get("/:id", protect, getMealById);
router.put("/:id", protect, updateMeal);
router.delete("/:id", protect, deleteMeal);

module.exports = router;