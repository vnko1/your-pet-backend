const { Pets } = require("../../services");
const { tryCatchWrapper, httpError } = require("../../utils");
const { errorMessage } = require("../../constants");

const addPet = async (req, res) => {
  const { id: owner } = req.user;
  const { body } = req;

  const pet = await Pets.add({ ...body, owner });

  res.json({ pet });
};

const deletePet = async (req, res) => {
  const { petId } = req.params;
  const { id } = req.user;

  {
    const pet = await Pets.find(petId);

    if (pet.owner.toString() !== id)
      throw httpError(401, errorMessage[401].wrongAuth);
  }

  const pet = await Pets.remove(petId);

  if (!pet) throw httpError(404, errorMessage[404]);

  res.json({ pet });
};

module.exports = {
  addPet: tryCatchWrapper(addPet),
  deletePet: tryCatchWrapper(deletePet),
};
