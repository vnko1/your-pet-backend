const { Pets, Image, Users } = require("../../services");
const { tryCatchWrapper } = require("../../utils");
const { userFieldType } = require("../../constants");

const addPet = async (req, res) => {
  const { id: owner } = req.user;
  const { body } = req;

  const pet = await Pets.add({ ...body, owner });
  await Users.updateUser(owner, { $push: pet.id }, userFieldType.pets);

  res.json({
    pet: {
      _id: pet.id,
      category: pet.category,
      name: pet.name,
      date: pet.date,
      type: pet.type,
      fileUrl: pet.fileUrl,
      owner: pet.owner,
    },
  });
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
