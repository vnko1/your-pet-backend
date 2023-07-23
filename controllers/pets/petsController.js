const { Pets, Image, Users } = require("../../services");
const { tryCatchWrapper, httpError } = require("../../utils");
const { errorMessage } = require("../../constants");

const addPet = async (req, res) => {
  const { id: owner } = req.user;
  const { body } = req;

  const pet = await Pets.add({ ...body, owner });
  await Users.updateUserPets(owner, { $push: pet.id });
  pet.owner = undefined;
  pet.fileId = undefined;

  res.json({ pet });
};

const deletePet = async (req, res) => {
  const { petId } = req.params;

  const pet = await Pets.remove(petId);
  await Image.deleteImage(pet.fileId);
  await Users.updateUserPets(pet.owner, { $pull: pet.id });
  pet.owner = undefined;
  pet.fileId = undefined;

  res.json({ pet });
};

module.exports = {
  addPet: tryCatchWrapper(addPet),
  deletePet: tryCatchWrapper(deletePet),
};
