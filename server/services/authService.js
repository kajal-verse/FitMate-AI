const registerUser = async (userData) => {
  return {
    success: true,
    message: "Register service working!",
    data: userData,
  };
};

module.exports = {
  registerUser,
};