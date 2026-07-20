const express = require("express");
const router = express.Router();

const { register,verifyEmail,login,updateProfile,getProfile,logout } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", login);
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.put("/profile", protect, 
  upload.single("profileImage"),
  updateProfile);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);

module.exports = router;