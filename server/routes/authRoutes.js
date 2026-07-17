const express = require("express");
const router = express.Router();

const { register,login,updateProfile,getProfile,logout } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.put("/profile", protect, updateProfile);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

module.exports = router;