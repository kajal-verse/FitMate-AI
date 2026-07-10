const workoutService = require("../services/workoutService");

const createWorkout = async (req, res) => {
  try {
    const result = await workoutService.createWorkout(
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

const getMyWorkouts = async (req, res) => {
  try {
    const result = await workoutService.getMyWorkouts(req.user._id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getWorkoutById = async (req, res) => {
  try {
    const result = await workoutService.getWorkoutById(
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

const updateWorkout = async (req, res) => {
  try {
    const result = await workoutService.updateWorkout(
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

const deleteWorkout = async (req, res) => {
  try {
    const result = await workoutService.deleteWorkout(
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
  createWorkout,
  getMyWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};