const dashboardService = require("../services/dashboardService");

const getDashboardStats = async (req, res) => {
  try {
    const result = await dashboardService.getDashboardStats(req.user._id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};