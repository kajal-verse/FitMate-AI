const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FitMate AI API 🚀",
  });
});

module.exports = app;