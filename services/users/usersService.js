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

  static async findUserFavNotices(id) {
    const notices = await User.find(id);
    const total = await User.countDocuments(id);

    return { notices, total };
  }
}

module.exports = { Users };
