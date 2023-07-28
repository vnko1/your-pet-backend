const { User } = require("../../models");

class Users {
  static createUser(newUser) {
    return User.create(newUser);
  }

  static findUserByQuery(searchParam, exception = {}) {
    const [key] = Object.keys(searchParam);
    const query = { [key]: searchParam[key] };

    const [exceptionKey] = Object.keys(exception);

    if (exceptionKey)
      query.$nor = [{ [exceptionKey]: exception[exceptionKey] }];

    return User.findOne(query);
  }

  static updateUser({ id, data, fieldName = null, projection = null }) {
    if (fieldName) {
      const key = Object.keys(data);
      return User.findByIdAndUpdate(
        id,
        {
          [key]: { [fieldName]: data[key] },
        },
        { new: true, projection }
      );
    }

    return User.findByIdAndUpdate(id, data, { new: true, projection });
  }

  static findUserById(id, projection = null) {
    return User.findById(id, projection);
  }
}

module.exports = { Users };
