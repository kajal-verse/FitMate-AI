const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    height: {
      type: Number,
    },

    weight: {
      type: Number,
    },

    fitnessGoal: {
      type: String,
      enum: ["Lose Weight", "Gain Muscle", "Stay Fit"],
    },

    fitnessLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },

    workoutLocation: {
      type: String,
      enum: ["Home", "Gym"],
    },

   profileImage: {
  type: String,
  default: "",
},

isVerified: {
  type: Boolean,
  default: false,
},

verificationToken: {
  type: String,
},

verificationTokenExpires: {
  type: Date,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);