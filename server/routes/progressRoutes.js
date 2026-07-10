const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createProgress,
  getMyProgress,
  getLatestProgress,
  deleteProgress,
} = require("../controllers/progressController");

router.post("/", protect, createProgress);

router.get("/", protect, getMyProgress);

router.get("/latest", protect, getLatestProgress);

router.delete("/:id", protect, deleteProgress);

module.exports = router;