const {
  register,
  login,
  current,
  logout,
  update,
} = require("./users/usersController");

module.exports = { register, login, current, logout, update };
