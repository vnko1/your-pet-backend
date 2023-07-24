const { Pet } = require("../../models");

class Pets {
  static add(newPet) {
    return Pet.create(newPet);
  }

  static find(id) {
    return Pet.findById(id);
  }

  static remove(id) {
    return Pet.findByIdAndDelete(id);
  }
}

module.exports = { Pets };
