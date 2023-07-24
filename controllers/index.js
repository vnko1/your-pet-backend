const {
  register,
  login,
  current,
  logout,
  update,
  getMe,
} = require("./users/usersController");

const { addPet, deletePet } = require("./pets/petsController");

const { getSponsors } = require("./sponsors/sponsorsController");

const { getArticles } = require("./articles/articlesController");

module.exports = {
  register,
  login,
  current,
  logout,
  update,
  getMe,
  addPet,
  deletePet,
  getSponsors,
  getArticles,
};
