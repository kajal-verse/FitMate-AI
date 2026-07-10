const progressService = require("../services/progressService");

// Create
const createProgress = async (req, res) => {
  try {
    const result = await progressService.createProgress(
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

// Get All
const getMyProgress = async (req, res) => {
  try {
    const result = await progressService.getMyProgress(req.user._id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Latest
const getLatestProgress = async (req, res) => {
  try {
    const result = await progressService.getLatestProgress(req.user._id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
const deleteProgress = async (req, res) => {
  try {
    const result = await progressService.deleteProgress(
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
  createProgress,
  getMyProgress,
  getLatestProgress,
  deleteProgress,
};