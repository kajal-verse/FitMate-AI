const Meal = require("../models/Meal");

const createMeal = async (mealData, userId) => {
  const {
    mealType,
    foodName,
    calories,
    protein,
    carbs,
    fat,
    mealDate,
  } = mealData;

  // Validate required fields
  if (!mealType || !foodName || calories === undefined) {
    throw new Error("Meal type, food name and calories are required.");
  }

  // Create meal
  const meal = await Meal.create({
    user: userId,
    mealType,
    foodName,
    calories,
    protein,
    carbs,
    fat,
    mealDate,
  });

  return {
    success: true,
    message: "Meal added successfully.",
    meal,
  };
};

const getMyMeals = async (userId) => {
  const meals = await Meal.find({ user: userId }).sort({
    mealDate: -1,
  });

  return {
    success: true,
    count: meals.length,
    meals,
  };
};

const getMealById = async (mealId, userId) => {
  const meal = await Meal.findOne({
    _id: mealId,
    user: userId,
  });

  if (!meal) {
    throw new Error("Meal not found.");
  }

  return {
    success: true,
    meal,
  };
};

const updateMeal = async (mealId, userId, mealData) => {
  const meal = await Meal.findOne({
    _id: mealId,
    user: userId,
  });

  if (!meal) {
    throw new Error("Meal not found.");
  }

  const allowedFields = [
    "mealType",
    "foodName",
    "calories",
    "protein",
    "carbs",
    "fat",
    "mealDate",
  ];

  allowedFields.forEach((field) => {
    if (mealData[field] !== undefined) {
      meal[field] = mealData[field];
    }
  });

  await meal.save();

  return {
    success: true,
    message: "Meal updated successfully.",
    meal,
  };
};

const deleteMeal = async (mealId, userId) => {
  const meal = await Meal.findOne({
    _id: mealId,
    user: userId,
  });

  if (!meal) {
    throw new Error("Meal not found.");
  }

  await meal.deleteOne();

  return {
    success: true,
    message: "Meal deleted successfully.",
  };
};

module.exports = {
  createMeal,
  getMyMeals,
getMealById,
updateMeal,
deleteMeal,
};