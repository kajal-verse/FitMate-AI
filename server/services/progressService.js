const Progress = require("../models/Progress");

// Create Progress
const createProgress = async (progressData, userId) => {
  const { weight, height, goalWeight } = progressData;

  if (!weight || !height || !goalWeight) {
    throw new Error("Weight, height and goal weight are required.");
  }

  const heightInMeters = height / 100;

  const bmi = Number(
    (weight / (heightInMeters * heightInMeters)).toFixed(2)
  );

  const progress = await Progress.create({
    user: userId,
    weight,
    height,
    goalWeight,
    bmi,
  });

  return {
    success: true,
    message: "Progress recorded successfully.",
    progress,
  };
};

// Get All Progress
const getMyProgress = async (userId) => {
  const progress = await Progress.find({ user: userId }).sort({
    recordedAt: -1,
  });

  return {
    success: true,
    count: progress.length,
    progress,
  };
};

// Get Latest Progress
const getLatestProgress = async (userId) => {
  const progress = await Progress.findOne({
    user: userId,
  }).sort({
    recordedAt: -1,
  });

  if (!progress) {
    throw new Error("No progress found.");
  }

  return {
    success: true,
    progress,
  };
};

// Delete Progress
const deleteProgress = async (progressId, userId) => {
  const progress = await Progress.findOne({
    _id: progressId,
    user: userId,
  });

  if (!progress) {
    throw new Error("Progress not found.");
  }

  await progress.deleteOne();

  return {
    success: true,
    message: "Progress deleted successfully.",
  };
};

module.exports = {
  createProgress,
  getMyProgress,
  getLatestProgress,
  deleteProgress,
};