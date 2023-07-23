const { Pets, Image, Users } = require("../../services");
const { tryCatchWrapper, httpError } = require("../../utils");
const { errorMessage } = require("../../constants");
const { User } = require("../../models");

const addPet = async (req, res) => {
  const { id: owner } = req.user;
  const { body } = req;

  const pet = await Pets.add({ ...body, owner });
  pet.owner = undefined;
  pet.fileId = undefined;
  await Users.updateUserPets(id, pet.id);
  res.json({ pet });
};

const deletePet = async (req, res) => {
  const { petId } = req.params;

  const pet = await Pets.remove(petId);
  await Image.deleteImage(pet.fileId);
  await Users.removeUserPets(pet.owner, pet.id);

  pet.owner = undefined;
  pet.fileId = undefined;

  res.json({ pet });
};

module.exports = {
  addPet: tryCatchWrapper(addPet),
  deletePet: tryCatchWrapper(deletePet),
};
