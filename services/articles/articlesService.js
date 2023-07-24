const { Article } = require("../../models");

class Articles {
  static async getAll({ query = "", page = 1, limit = 6, sort = "desc" }) {
    const perPage = page > 0 ? (page - 1) * limit : 0;
    const findOptions = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { text: { $regex: query, $options: "i" } },
          ],
        }
      : {};
    const articles = await Article.find(findOptions, "-id")
      .skip(perPage)
      .limit(limit)
      .sort({ date: sort });

    const total = await Article.count(findOptions);

    return { articles, total };
  }
}

module.exports = { Articles };
