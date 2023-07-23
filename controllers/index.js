const {
  register,
  login,
  current,
  logout,
  update,
  getMe,
} = require("./users/usersController");

const { addPet, deletePet } = require("./pets/petsController");

module.exports = {
  register,
  login,
  current,
  logout,
  update,
  getMe,
  addPet,
  deletePet,
};
