const { Pets, Image, Users } = require("../../services");
const { tryCatchWrapper } = require("../../utils");

const addPet = async (req, res) => {
  const { id: owner } = req.user;
  const { body } = req;
  console.log(req);
  const pet = await Pets.add({ ...body, owner });
  await Users.updateUser({
    id: owner,
    fieldName: "pets",
    data: { $push: pet.id },
  });

  res.json({
    pet: {
      _id: pet.id,
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

  await Users.updateUser({
    id: pet.owner,
    data: { $pull: pet.id },
    fieldName: "pets",
  });

  res.json({ _id: pet.id });
};

module.exports = {
  addPet: tryCatchWrapper(addPet),
  deletePet: tryCatchWrapper(deletePet),
};
