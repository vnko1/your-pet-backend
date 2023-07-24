const { User } = require("../../models");

class Users {
  static createUser(newUser) {
    return User.create(newUser);
  }

  static findUserByQuery(data) {
    const [key] = Object.keys(data);
    const query = { [key]: data[key] };

    return User.findOne(query);
  }

  static updateUser(id, newData) {
    return User.findByIdAndUpdate(id, newData, { new: true });
  }

  static updateUserPets(id, data) {
    const key = Object.keys(data);
    return User.findByIdAndUpdate(id, { [key]: { pets: data[key] } });
  }

  static findUserById(id) {
    return User.findById(id);
  }
}

module.exports = { Users };
