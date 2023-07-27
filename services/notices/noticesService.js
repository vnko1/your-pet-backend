const { Notice } = require("../../models");
const { Search } = require("../../utils");

class Notices {
  static addNotice(newNotice) {
    return Notice.create(newNotice);
  }

  static findNoticeById(id) {
    return Notice.findById(id).populate("owner", "email phone");
  }

  static async findAll({
    owner,
    filter,
    category,
    sex,
    date,
    page,
    limit,
    sort,
    searchfield,
  }) {
    const findOptions = new Search({
      owner,
      filter,
      category,
      sex,
      date,
      page,
      limit,
      sort,
      searchfield,
    });

    const notices = await Notice.find(findOptions.getNoticesSearchOptions())
      .skip(findOptions.getPage())
      .limit(findOptions.getLimit())
      .sort(findOptions.getSort("date"));

    const total = await Notice.count(findOptions.getNoticesSearchOptions());

    return { notices, total };
  }

  static updateNotice({ id, data, fieldName, projection = null }) {
    const key = Object.keys(data);
    return Notice.findByIdAndUpdate(
      id,
      {
        [key]: { [fieldName]: data[key] },
      },
      { new: true, projection }
    );
  }

  static async findOwnerNotices({ owner }) {
    const notices = await Notice.find({ owner });

    const total = await Notice.countDocuments({ owner });

    return { notices, total };
  }

  static deleteById(id) {
    return Notice.findByIdAndDelete(id);
  }
}

module.exports = { Notices };
