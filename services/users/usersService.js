const { User } = require("../../models");
const { userFieldType } = require("../../constants");

class Users {
  static createUser(newUser) {
    return User.create(newUser);
  }

  static findUserByQuery(data) {
    const [key] = Object.keys(data);
    const query = { [key]: data[key] };

    return User.findOne(query);
  }

  static updateUser(id, data, fieldType, projection = null) {
    if (fieldType === userFieldType.pets) {
      const key = Object.keys(data);
      return User.findByIdAndUpdate(id, { [key]: { pets: data[key] } });
    }
    return User.findByIdAndUpdate(id, data, { new: true, projection });
  }

  static findUserById(id, projection = null) {
    return User.findById(id, projection);
  }
}

module.exports = { Users };
