const { Notice } = require("../../models");

class Notices {
  static addNotice(newNotice) {
    return Notice.create(newNotice);
  }

  static findNoticeById(id) {
    return Notice.findById(id).populate("owner", "email phone");
  }

  static async findAll({
    filter = "",
    category,
    page = 1,
    limit = 6,
    sort = "desc",
    sex,
    date = 0,
  }) {
    const perPage = page > 0 ? (page - 1) * limit : 0;
    const findOptions = filter
      ? {
          $or: [
            { title: { $regex: filter, $options: "i" } },
            { comments: { $regex: filter, $options: "i" } },
          ],
        }
      : {};

    if (date) {
      const currentDate = new Date();
      const dateFields = date.split(",");

      if (dateFields.length > 1) {
        const dates = dateFields.map((item) => {
          if (item < 1) return currentDate.setMonth(currentDate.getMonth() - 3);
          return currentDate.setFullYear(currentDate.getFullYear() - item);
        });
        const from = Math.max(...dates);
        findOptions.date = { $lte: from };
      } else {
        if (date < 1 && date > 0) {
          const from = currentDate.setMonth(currentDate.getMonth() - 3);
          const to = currentDate.setFullYear(currentDate.getFullYear() - 1);
          findOptions.date = { $lte: from, $gte: to };
        } else {
          const from = currentDate.setFullYear(
            currentDate.getFullYear() - date
          );
          findOptions.date = { $lte: from };
        }
      }
    }

    if (category) {
      findOptions.category = category;
    }

    if (sex) {
      findOptions.sex = sex.split(",");
    }

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
