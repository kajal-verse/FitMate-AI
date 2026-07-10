const express = require("express");
const router = express.Router();

const { register,login,updateProfile,logout } = require("../controllers/authController");
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

module.exports = router;