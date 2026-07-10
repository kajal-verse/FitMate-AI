const mealService = require("../services/mealService");

const createMeal = async (req, res) => {
  try {
    const result = await mealService.createMeal(
      req.body,
      req.user._id
    );

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyMeals = async (req, res) => {
  try {
    const result = await mealService.getMyMeals(req.user._id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMealById = async (req, res) => {
  try {
    const result = await mealService.getMealById(
      req.params.id,
      req.user._id
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMeal = async (req, res) => {
  try {
    const result = await mealService.updateMeal(
      req.params.id,
      req.user._id,
      req.body
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const result = await mealService.deleteMeal(
      req.params.id,
      req.user._id
    );

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMeal,
  getMyMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};