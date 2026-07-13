const Workout = require("../models/Workout");
const Meal = require("../models/Meal");
const Progress = require("../models/Progress");

const getDashboardStats = async (userId) => {
  // Total workouts
  const totalWorkouts = await Workout.countDocuments({
    user: userId,
  });

  // Total meals
  const totalMeals = await Meal.countDocuments({
    user: userId,
  });

  // Latest progress
  const latestProgress = await Progress.findOne({
    user: userId,
  }).sort({
    recordedAt: -1,
  });

  return {
    success: true,
    stats: {
      totalWorkouts,
      totalMeals,
      latestWeight: latestProgress ? latestProgress.weight : null,
      latestBMI: latestProgress ? latestProgress.bmi : null,
      goalWeight: latestProgress ? latestProgress.goalWeight : null,
      weightDifference: latestProgress
        ? latestProgress.weight - latestProgress.goalWeight
        : null,
    },
  };
};

module.exports = {
  getDashboardStats,
};