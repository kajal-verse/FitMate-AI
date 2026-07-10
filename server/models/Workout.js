const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Strength", "Cardio", "Yoga", "HIIT", "Flexibility", "Other"],
      default: "Other",
    },

    duration: {
      type: Number,
      required: true,
    },

    caloriesBurned: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    workoutDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);