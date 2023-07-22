const { Pet } = require("../../models");

class Pets {
  static add(newPet) {
    return Pet.create(newPet);
  }

  static remove(id) {
    return Pet.findOneAndDelete(id);
  }
}

module.exports = { Pets };
