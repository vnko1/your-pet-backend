const { Notice } = require("../../models");
const { Search } = require("../../utils");

class Notices {
  static addNotice(newNotice) {
    return Notice.create(newNotice);
  }

  static findNoticeById(id) {
    return Notice.findById(id).populate("owner", "email phone");
  }

  static async findAll({ filter, category, sex, date, page, limit, sort }) {
    const findOptions = new Search({
      filter,
      category,
      sex,
      date,
      page,
      limit,
      sort,
    });

    const notices = await Notice.find(findOptions.getNoticesSearchOptions())
      .skip(findOptions.getPage())
      .limit(findOptions.getLimit())
      .sort(findOptions.getSort("date"));

    const total = await Notice.count(findOptions.getNoticesSearchOptions());

    return { notices, total };
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
