const { Pets, Image, Users } = require("../../services");
const { tryCatchWrapper } = require("../../utils");
const { userFieldType } = require("../../constants");

const addPet = async (req, res) => {
  const { id: owner } = req.user;
  const { body } = req;

  const pet = await Pets.add({ ...body, owner });
  await Users.updateUser(owner, { $push: pet.id }, userFieldType.pets);
  pet.owner = undefined;
  pet.fileId = undefined;

  res.json({ pet });
};

const deletePet = async (req, res) => {
  const { petId } = req.params;

  const pet = await Pets.remove(petId);
  await Image.deleteImage(pet.fileId);
  await Users.updateUser(pet.owner, { $pull: pet.id }, userFieldType.pets);

  res.json({ _id: pet.id });
};

module.exports = {
  addPet: tryCatchWrapper(addPet),
  deletePet: tryCatchWrapper(deletePet),
};
