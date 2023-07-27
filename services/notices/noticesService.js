const { Notice } = require("../../models");

class Notices {
  static addNotice(newNotice) {
    return Notice.create(newNotice);
  }

  static findNoticeById(id) {
    return Notice.findById(id);
  }

  static async findAll({
    filter = "",
    category,
    page = 1,
    limit = 6,
    sort = "desc",
    sex,
    date,
  }) {
    const perPage = page > 0 ? (page - 1) * limit : 0;
    // const findOptions = filter
    //   ? {
    //       $or: [
    //         { title: { $regex: filter, $options: "i" } },
    //         { comments: { $regex: filter, $options: "i" } },
    //       ],
    //     }
    //   : {};

    const findOptions = { date: { $gt: 1 } };
    // const findOptions = {};

    // if (category) {
    //   findOptions.category = category;
    // }

    // if (sex) {
    //   findOptions.sex = sex;
    // }

    const notices = await Notice.find(findOptions)
      .skip(perPage)
      .limit(limit)
      .sort({
        date: sort,
      });

    const total = await Notice.count(findOptions);

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
