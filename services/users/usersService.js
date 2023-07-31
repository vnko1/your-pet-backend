const { User } = require("../../models");

class Users {
  static createUser(newUser) {
    return User.create(newUser);
  }

  static findUserByQuery(searchParam) {
    return User.findOne(searchParam);
  }

  static updateUser({
    id,
    data,
    fieldName = null,
    projection = null,
    newDoc = true,
  }) {
    if (fieldName) {
      const key = Object.keys(data);
      return User.findByIdAndUpdate(
        id,
        {
          [key]: { [fieldName]: data[key] },
        },
        { new: newDoc, projection }
      );
    }

    return User.findByIdAndUpdate(id, data, { new: newDoc, projection });
  }

  static findUserById(id, projection = null) {
    return User.findById(id, projection);
  }
}

module.exports = { Users };
