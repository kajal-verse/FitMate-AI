const Workout = require("../models/Workout");
const Meal = require("../models/Meal");
const Progress = require("../models/Progress");

const getDashboardStats = async (userId) => {
  // Total Workouts
  const totalWorkouts = await Workout.countDocuments({
    user: userId,
  });

  // Total Meals
  const totalMeals = await Meal.countDocuments({
    user: userId,
  });

  // Latest Progress
  const latestProgress = await Progress.findOne({
    user: userId,
  }).sort({
    recordedAt: -1,
  });

  // Latest Workout
  const recentWorkout = await Workout.findOne({
    user: userId,
  }).sort({
    workoutDate: -1,
  });

  // Latest Meal
  const recentMeal = await Meal.findOne({
    user: userId,
  }).sort({
    mealDate: -1,
  });

  // Progress History (for chart)
  const progressHistory = await Progress.find({
    user: userId,
  })
    .sort({
      recordedAt: 1,
    })
    .select("weight bmi recordedAt");

  return {
    success: true,

    stats: {
      totalWorkouts,
      totalMeals,
      latestWeight: latestProgress?.weight ?? null,
      latestBMI: latestProgress?.bmi ?? null,
      goalWeight: latestProgress?.goalWeight ?? null,
      weightDifference: latestProgress
        ? latestProgress.weight - latestProgress.goalWeight
        : null,
    },

    recentWorkout,

    recentMeal,

    progressHistory,
  };
};

module.exports = {
  getDashboardStats,
};