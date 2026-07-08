const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
};