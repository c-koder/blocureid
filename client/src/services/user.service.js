const UserRepository = require("../repositories/user.repository");

const getUser = (by, value) => {
  return UserRepository.getUser(by, value);
};

const registerUser = (user) => {
  return UserRepository.registerUser(user);
};

const sendEmailVerification = (data) => {
  return UserRepository.sendUserVerifyEmail(data);
};

const verifyUserEmail = (oobCode, user) => {
  return UserRepository.verifyUserEmail(oobCode, user);
};

const loginUser = (user) => {
  return UserRepository.loginUser(user);
};

const updateUserDetails = (data) => {
  return UserRepository.updateUserDetails(data);
};

const logout = () => {
  return UserRepository.logout();
};

export {
  getUser,
  registerUser,
  sendEmailVerification,
  verifyUserEmail,
  loginUser,
  updateUserDetails,
  logout,
};
