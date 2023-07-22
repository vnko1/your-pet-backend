const { Pets } = require("../../services");
const { tryCatchWrapper, httpError } = require("../../utils");
const { errorMessage } = require("../../constants");

const addPet = async (req, res) => {
  const { id: owner } = req.user;
  const { body } = req;

  const pet = await Pets.add({ ...body, owner });
  pet.owner = undefined;

  res.json({ pet });
};

const deletePet = async (req, res) => {
  const { petId } = req.params;

  const pet = await Pets.remove(petId);
  pet.owner = undefined;

  res.json({ pet });
};

module.exports = {
  addPet: tryCatchWrapper(addPet),
  deletePet: tryCatchWrapper(deletePet),
};
