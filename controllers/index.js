const {
  register,
  login,
  current,
  logout,
  update,
} = require("./users/usersController");

const { addPet, deletePet } = require("./pets/petsController");

module.exports = {
  register,
  login,
  current,
  logout,
  update,
  addPet,
  deletePet,
};
