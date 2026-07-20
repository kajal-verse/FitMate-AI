const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

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
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // 4. Save user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,

     verificationToken,
  verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });

  await sendEmail({
  to: user.email,
  subject: "Verify your FitMate Account",
  html: `
    <h2>Welcome to FitMate!</h2>

    <p>Thank you for registering.</p>

    <p>Please click the button below to verify your email.</p>

    <a
      href="http://localhost:5000/api/auth/verify-email/${verificationToken}"
      style="
        background:#16a34a;
        color:white;
        padding:12px 20px;
        text-decoration:none;
        border-radius:8px;
        display:inline-block;
      "
    >
      Verify Email
    </a>

    <p>This link expires in 24 hours.</p>
  `,
});

  // Temporary response
  return {
    success: true,
    message: "Registration successful. Please check your email to verify your account.",
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
const updateProfile = async (userId, userData, file) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  // Upload image to Cloudinary
  if (file) {
    const base64Image = file.buffer.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${base64Image}`,
      {
        folder: "fitmate/profile",
      }
    );

    user.profileImage = result.secure_url;
  }


  const allowedFields = [
    "name",
    "age",
    "gender",
    "height",
    "weight",
    "fitnessGoal",
    "activityLevel",
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