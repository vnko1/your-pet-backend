const { Article } = require("../../models");

class Articles {
  static async getAll({ filter = "", page = 1, limit = 6, sort = "desc" }) {
    const perPage = page > 0 ? (page - 1) * limit : 0;
    const findOptions = filter
      ? {
          $or: [
            { title: { $regex: filter, $options: "i" } },
            { text: { $regex: filter, $options: "i" } },
          ],
        }
      : {};
    const articles = await Article.find(findOptions, "-id")
      .skip(perPage)
      .limit(limit)
      .sort({ date: sort });

    const total = await Article.estimatedDocumentCount(findOptions);

    return { articles, total };
  }
}

module.exports = { Articles };
