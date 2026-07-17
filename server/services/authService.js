const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
const registerUser = async (userData) => {
  // Destructure user data
  const { name, email, password } = userData;

  // Validate required fields
  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }
// check email already exists or not
  const existingUser = await User.findOne({ email });

if (existingUser) {
  throw new Error("User already exists with this email.");
}
 // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Save user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Temporary response
  return {
    success: true,
    message: "Validation successful.",
    data: {
      name,
      email,
    },
  };
};



// login
const loginUser = async (userData) => {
  const { email, password } = userData;

  // Step 1: Validate input
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  // Step 2: Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Step 3: Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password.");
  }

   //step-4 Generate JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Step 5: Return success
  return {
    success: true,
    message: "Login successful.",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

// updateProfile
const updateProfile = async (userId, userData) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const allowedFields = [
    "name",
    "age",
    "gender",
    "height",
    "weight",
    "fitnessGoal",
    "activityLevel",
    "profileImage",
  ];

  allowedFields.forEach((field) => {
    if (userData[field] !== undefined) {
      user[field] = userData[field];
    }
  });

  await user.save();

  return {
    success: true,
    message: "Profile updated successfully.",
    user,
  };
};

const getProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found.");
  }

  return {
    success: true,
    user,
  };
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getProfile,
};