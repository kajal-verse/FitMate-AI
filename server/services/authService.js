const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

  // Step 4: Return success
  return {
    success: true,
    message: "Login successful.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
module.exports = {
  registerUser,
  loginUser,
};