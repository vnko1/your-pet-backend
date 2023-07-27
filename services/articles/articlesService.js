const { Article } = require("../../models");
const { Search } = require("../../utils");

class Articles {
  static async getAll({ filter, page, limit, sort }) {
    const findOptions = new Search({ filter, page, limit, sort });

    const articles = await Article.find(
      findOptions.getArticlesSearchOptions(),
      "-id"
    )
      .skip(findOptions.getPage())
      .limit(findOptions.getLimit())
      .sort(findOptions.getSort("date"));

    const total = await Article.countDocuments(
      findOptions.getArticlesSearchOptions()
    );

    return { articles, total };
  }
}

module.exports = { Articles };
