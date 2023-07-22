const { tryCatchWrapper, httpError } = require("../../utils");

const addPet = async (req, res) => {};

const deletePet = async (req, res) => {};

module.exports = {
  addPet: tryCatchWrapper(addPet),
  deletePet: tryCatchWrapper(deletePet),
};
