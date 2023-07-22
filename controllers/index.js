const {
  register,
  login,
  current,
  logout,
  update,
} = require("./users/usersController");

const { add, getAll } = require("./notices/noticesController");

module.exports = { register, login, current, logout, update, add, getAll };
