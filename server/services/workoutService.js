const Workout = require("../models/Workout");

const createWorkout = async (workoutData, userId) => {
  const {
    title,
    category,
    duration,
    caloriesBurned,
    notes,
    workoutDate,
  } = workoutData;

  // Validate required fields
  if (!title || !duration) {
    throw new Error("Title and duration are required.");
  }

  // Create workout
  const workout = await Workout.create({
    user: userId,
    title,
    category,
    duration,
    caloriesBurned,
    notes,
    workoutDate,
  });

  return {
    success: true,
    message: "Workout created successfully.",
    workout,
  };
};

const getMyWorkouts = async (userId) => {
  const workouts = await Workout.find({ user: userId }).sort({
    workoutDate: -1,
  });

  return {
    success: true,
    count: workouts.length,
    workouts,
  };
};

const getWorkoutById = async (workoutId, userId) => {
  const workout = await Workout.findOne({
    _id: workoutId,
    user: userId,
  });

  if (!workout) {
    throw new Error("Workout not found.");
  }

  return {
    success: true,
    workout,
  };
};

const updateWorkout = async (workoutId, userId, workoutData) => {
  const workout = await Workout.findOne({
    _id: workoutId,
    user: userId,
  });

  if (!workout) {
    throw new Error("Workout not found.");
  }

  const allowedFields = [
    "title",
    "category",
    "duration",
    "caloriesBurned",
    "notes",
    "workoutDate",
  ];

  allowedFields.forEach((field) => {
    if (workoutData[field] !== undefined) {
      workout[field] = workoutData[field];
    }
  });

  await workout.save();

  return {
    success: true,
    message: "Workout updated successfully.",
    workout,
  };
};

const deleteWorkout = async (workoutId, userId) => {
  const workout = await Workout.findOne({
    _id: workoutId,
    user: userId,
  });

  if (!workout) {
    throw new Error("Workout not found.");
  }

  await workout.deleteOne();

  return {
    success: true,
    message: "Workout deleted successfully.",
  };
};

module.exports = {
  createWorkout,
  getMyWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};