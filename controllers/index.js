const {
  register,
  login,
  current,
  logout,
  update,
} = require("./user/userController");

module.exports = { register, login, current, logout, update };
